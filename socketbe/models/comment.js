const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
    },
    
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    post_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    parent_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }
},{timestamps:true});

//Export the model
module.exports = mongoose.model('Comment', commentSchema);