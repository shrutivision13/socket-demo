const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const postSchema = new mongoose.Schema({
    title: {
        type: String,
       
    },
    description: {
        type: String,
       
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    image:{
        type:String
    }
},{timestamps:true});

//Export the model
module.exports = mongoose.model('Post', postSchema);