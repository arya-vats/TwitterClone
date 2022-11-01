const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../schemas/UserSchema");
const bcrypt = require("bcrypt");



app.use(bodyParser.urlencoded({ extended:false })); //we need body parser to receive/parse the form data such that it can be used like req.body 

router.get("/", (req,res,next)=>{

    if(req.session){
        req.session.destroy(()=>{
            res.redirect("/login");
        })
    }
})



module.exports = router;