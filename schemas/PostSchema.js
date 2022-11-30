const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    content: {
        type: String,
        trim: true
    },
    postedBy: {
        type: Schema.Types.ObjectId, //objectid is the unique id that is given to every stored value in db by mongoose
        ref: 'User'
    },
    pinned: {
        type: Boolean
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    retweetUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    retweetData: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
},{timestamps: true});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;