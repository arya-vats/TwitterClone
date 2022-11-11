const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../schemas/UserSchema");
const Post = require("../../schemas/PostSchema");


app.use(bodyParser.urlencoded({ extended:false })); //we need body parser to receive/parse the form data such that it can be used like req.body 
router.get("/", (req,res,next)=>{
   Post.find()
   .populate("postedBy")
   .sort({"createdAt": 1})
   .then((results)=>{
      res.status(200).send(results) //since we are sending the results back to the page, for this callback would be used hence results are in the callback
   }).catch(error => {
      res.sendStatus(400);
   })
})

router.post("/", async(req,res,next)=>{
   if(!req.body.content) {
    console.log("Content param not sent with request");
     return res.sendStatus(400);
   }

   var postData = {
      content: req.body.content,
      postedBy: req.session.user
   }

   Post.create(postData)
   .then(async (newPost) => {
      newPost = await User.populate(newPost, { path: "postedBy" }) //used to populate it with all the information in the db. Basically reference the document with the same field 
      
      res.status(201).send(newPost);
   })
   .catch((error) => {
      console.log(error);
      res.sendStatus(400);
   })
})

module.exports = router;






module.exports = router;