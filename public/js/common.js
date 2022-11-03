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
    return postData.content;
}