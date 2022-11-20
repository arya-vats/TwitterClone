const express = require('express');
const app = express();
const Port = 3000;
const middleware = require('./middleware')
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require("./database");
const session = require("express-session");

app.set("view engine", "pug");
app.set("views", "views") //it means that whenever we need a template called views(lhs) we go to view folder(rhs)
app.use(session({
    secret: "everything is planned",
    resave: true, //saves the session to the storage even if the session did get modified during the request.
    saveUninitialized: false //sets the session as initialized even if it was saved. Saves storage on the server.
}))
 //Routes
 
 app.use(bodyParser.urlencoded({ extended:true }));
 app.use(express.static(path.join(__dirname, "public"))); //anything inside the public folder is to be served as a static file
 const loginRoute = require('./routes/loginRoutes');
 const registerRoute = require('./routes/registerRoutes');
 const logoutRoute = require("./routes/logout")

 //Api routes
 const postsApiRoute = require("./routes/api/posts");

 app.use("/login", loginRoute);
 app.use("/register", registerRoute);
 app.use("/logout", logoutRoute);

 app.use("/api/posts", postsApiRoute);
 
 app.get("/", middleware.requireLogin, (req,res,next)=>{
    
    var payload = {
        pageTitle: "Home",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user) //since we need to pass the data to the pug template we need JSON.stringify to be able to render the data inside a pug template.
    }

    res.status(200).render("home", payload); // it takes two parameter home and payload, payload is the data that we want to send to the page
})



const server = app.listen(Port, ()=>{
    console.log(`Server listening on port ${Port}`);
})

