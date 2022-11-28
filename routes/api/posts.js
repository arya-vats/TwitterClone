const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../schemas/UserSchema");
const Post = require("../../schemas/PostSchema");
const session = require("express-session");


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

router.post("/", async(req,res,next)=>{

})

router.put("/:id/like", async(req,res,next)=>{
   // console.log((req.params.id)); //retrieving the post id from the url using params.

   var postId = req.params.id;
   var userId = req.session.user._id;
   var isLiked = req.session.user.likes && req.session.user.likes.includes(postId);

   var option = isLiked ? "$pull" : "$addToSet";

   //Insert user like
   req.session.user = await User.findByIdAndUpdate(userId, { [option]: { likes: postId}}, { new: true }) //add values to the likes array
   //by default findbyid returns the previous user value which means that we will have the previous value which means unliked value, but we need new updated value, for that we use new:true at the end to tell this to return newly updated value.
   .catch(error => {
      console.log(error);
      res.sendStatus(400);
   })
   //insert post like
   var post = await Post.findByIdAndUpdate(postId, { [option]: { likes: userId}}, { new: true }) //add values to the likes array
   //by default findbyid returns the previous post value which means that we will have the previous value which means unliked value, but we need new updated value, for that we use new:true at the end to tell this to return newly updated value.
   .catch(error => {
      console.log(error);
      res.sendStatus(400);
   })
   res.status(200).send(post)
})

router.post("/:id/retweet", async(req,res,next)=>{
   return res.status(200).send("yee haa!");
   // console.log((req.params.id)); //retrieving the post id from the url using params.

   var postId = req.params.id;
   var userId = req.session.user._id;
   var isLiked = req.session.user.likes && req.session.user.likes.includes(postId);

   var option = isLiked ? "$pull" : "$addToSet";

   //Insert user like
   req.session.user = await User.findByIdAndUpdate(userId, { [option]: { likes: postId}}, { new: true }) //add values to the likes array
   //by default findbyid returns the previous user value which means that we will have the previous value which means unliked value, but we need new updated value, for that we use new:true at the end to tell this to return newly updated value.
   .catch(error => {
      console.log(error);
      res.sendStatus(400);
   })
   //insert post like
   var post = await Post.findByIdAndUpdate(postId, { [option]: { likes: userId}}, { new: true }) //add values to the likes array
   //by default findbyid returns the previous post value which means that we will have the previous value which means unliked value, but we need new updated value, for that we use new:true at the end to tell this to return newly updated value.
   .catch(error => {
      console.log(error);
      res.sendStatus(400);
   })
   res.status(200).send(post)
})

module.exports = router;