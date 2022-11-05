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

function createPostHtml(postData) {

    var postedBy = postData.postedBy;
    var displayName = postedBy.firstName + " " + postedBy.lastName;
    var timestamp = postData.createdAt;
    return `<div class='post'>
                <div class='mainContentContainer'>
                    <div class='userImageContainer'>
                        <img src='${postedBy.profilePic}'>
                    </div>
                    <div class ='postContentContainer'>
                        <div class='header'>
                            <a href='/profile/${postedBy.username}'> ${displayName}</a>
                            <span class ='username'>@${postedBy.username}</span>
                            <span class ='date'>${timestamp}</span>
                        </div>
                        <div class='postBody'>
                        <span>${postData.content}</span>
                        </div>
                        <div class='postFooter'>
                        </div>
                    </div>
                </div>
    
    </div>`;
}