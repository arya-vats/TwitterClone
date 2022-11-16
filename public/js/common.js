$("#postTextarea").keyup((event)=> {
    var textbox = $(event.target);
    var value = textbox.val().trim

    var submitButton = $("#submitPostButton");

    if(submitButton.length == 0) {
        return alert("no submit button found");
    }
    if(value == "") {
        submitButton.prop("disabled", true);
        return;
    }

    submitButton.prop("disabled", false);

})

$("#submitPostButton").click(()=> {
    var button = $(event.target);
    var textbox = $("#postTextarea");

    var data = {
        content: textbox.val()
    }

     //making an AJAX request so that the browser does not reload and sends the information
    $.post("/api/posts", data, (postData) => { //data is sent and postdata is received
        console.log(postData);

        var html = createPostHtml(postData)
        $(".postsContainer").prepend(html); //adds the post to the front (in case of append, adds to last)
        textbox.val("");
        button.prop("disabled", true)
    })
})

$(document).on("click", ".likeButton", (event)=> { //this will make sure that wherever button with .likebutton is clicked in the document, the result is executed.
    var button = $(event.target);
    var postId = getPostIdFromElement(button);
    
    if(postId===undefined){
        return;
    }
    $.ajax({
        url: `/api/posts/${postId}/like`,
        type: "PUT",
        success: (postData) => {
            button.find("span").text(postData.likes.length || "")
        }
    })
})

function getPostIdFromElement(element) {
    var isRoot = element.hasClass("post"); //if any post has this class we know its the root element otherwise it is a child element
    var rootElement = isRoot ? element : element.closest(".post"); //jquery selector (closest) that goes up the tree and finds the parent element of the class post :)
    var postId = rootElement.data().id; //id gives us all of the data attributes attached to that post. In our case the id, that's why we have specified .id.

    if(postId === undefined) {
        return alert("post id is undefined");
    }
    return postId;
}

function createPostHtml(postData) {

    var postedBy = postData.postedBy;

    if(postedBy._id===undefined) {
        return console.log("User object not populated")
    }
    var displayName = postedBy.firstName + " " + postedBy.lastName;
    var timestamp = timeDifference(new Date(), new Date(postData.createdAt))
    return `<div class='post' data-id='${postData._id}'>
                <div class='mainContentContainer'>
                    <div class='userImageContainer'>
                        <img src='${postedBy.profilePic}'>
                    </div>
                    <div class ='postContentContainer'>
                        <div class='header'>
                            <a href='/profile/${postedBy.username}'> <class='displayName'> ${displayName}</a>
                            <span class ='username'>@${postedBy.username}</span>
                            <span class ='date'>${timestamp}</span>
                        </div>
                        <div class='postBody'>
                        <span>${postData.content}</span>
                        </div>
                        <div class='postFooter'>
                        <div class='postButtonContainer'>
                            <button>
                                <i class='fa-solid fa-retweet'></i>
                            </button>
                        </div>
                        <div class='postButtonContainer'>
                            <button>
                                <i class='fa-regular fa-comment'></i>
                            </button>
                        </div>
                        <div class='postButtonContainer'>
                            <button class='likeButton'>
                                <i class='fa-regular fa-heart'></i>
                                <span>${postData.likes.length || ""}</span>
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
    
    </div>`;
}

function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        if(elapsed/1000 < 30) return "Just now";
        
        return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}