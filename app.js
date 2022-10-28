const express = require('express');
const app = express();
const Port = 3000;
const middleware = require('./middleware')
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require("./database");
app.set("view engine", "pug");
app.set("views", "views") //it means that whenever we need a template called views(lhs) we go to view folder(rhs)
 //Routes
 
 app.use(bodyParser.urlencoded({ extended:true }));
 app.use(express.static(path.join(__dirname, "public"))); //anything inside the public folder is to be served as a static file
 const loginRoute = require('./routes/loginRoutes');
 const registerRoute = require('./routes/registerRoutes');

 app.use("/login", loginRoute);
 app.use("/register", registerRoute);
app.get("/", middleware.requireLogin, (req,res,next)=>{
    
    var payload = {
        pageTitle: "Home"
    }

    res.status(200).render("home", payload); // it takes two parameter home and payload, payload is the data that we want to send to the page
})



const server = app.listen(Port, ()=>{
    console.log(`Server listening on port ${Port}`);
})

