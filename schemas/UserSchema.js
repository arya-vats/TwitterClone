const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true //if there are spaces in the input data, it will remove those spaces.
    },
    lastName: {
        type: String,
        required: true,
        trim: true  
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true  
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: "/images/profilePic.jpg" //if user does not specify pp, then it will use this value instead.
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    retweets: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
},{ timestamps: true 
});

var User = mongoose.model('User', UserSchema);
module.exports = User;