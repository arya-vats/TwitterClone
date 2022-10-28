const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../schemas/UserSchema");
const router = express.Router();

app.use(bodyParser.urlencoded({ extended:false }));
app.set("view engine", "pug");
app.set("views", "views") //it means that whenever we need a template called views(lhs) we go to view folder(rhs)

router.get("/", (req,res,next)=>{

    res.status(200).render("register"); 
})

router.post("/", async(req,res,next) =>{
    var firstName = req.body.firstName.trim(); //trim method gets rid of spaces example : _____arya --> arya
    var lastName = req.body.lastName.trim();
    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var password = req.body.password;
    var payload = req.body;
    if(firstName && lastName && username && email && password){
       var user = await User.findOne({ 
            $or: [ //$or is an operator that does the same thing as normal OR operator
            { username: username },
            { email: email }
            ]
        })
        .catch((error)=>{
            console.log(error);
            payload.errorMessage = "Something went wrong"; 
            res.status(200).render("register", payload);
        });

        if(user == null){
            //no user found
            var data = req.body;
            data.password = await bcrypt.hash(password, 10) //this is how many rounds the pass is gonna hash(2^10 in this case)
            User.create(data)
            .then((user) => {
                console.log(user);
            })
        }
        else {
            //user found
            if(email == user.email){
                payload.errorMessage = "Email already in use";
            }else{
                payload.errorMessage = "Username already in use";
            }
            res.status(200).render("register", payload);
        }
        }
    else{
        payload.errorMessage = "Make sure each field has a valid value"; //or previous dono same h
        res.status(200).render("register", payload);
    }
})

module.exports = router;