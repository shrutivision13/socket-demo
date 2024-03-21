const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    parent_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Tasks",
    },
   
});

//Export the model
module.exports = mongoose.model('Tasks', taskSchema);