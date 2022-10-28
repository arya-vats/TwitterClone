const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
app.set("view engine", "pug");
app.set("views", "views") //it means that whenever we need a template called views(lhs) we go to view folder(rhs)

app.use(bodyParser.urlencoded({ extended:false })); //we need body parser to receive/parse the form data such that it can be used like req.body 
router.get("/", (req,res,next)=>{

    res.status(200).render("login"); 
})

router.post("/", (req,res,next)=>{
    console.log(req.body);
    res.status(200).render("register"); 
})



module.exports = router;