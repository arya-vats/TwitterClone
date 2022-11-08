$(document).ready(()=>{
    $.get("/api/posts", (results) => { //data is sent and postdata is received
        outputPosts(results, $(".postsContainer"))
    })
})

function outputPosts(results, container) { //loops through the postsarray in the db and then passes them into the function and the function will create the posts and then we will append into the container above and the container will show the posts as a result of the get request.
    container.html("");

    results.forEach(result => {
        var html = createPostHtml(result)
        container.append(html);
    });

    if(results.length == 0){
        container.append("<span class='noResults'>Nothing to show</span>")
    }
}