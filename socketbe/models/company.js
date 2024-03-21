const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const companySchema = new mongoose.Schema({
    name: {
        type: String,
       
    },
    emaployeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    },
    company_image:{
        type:String
    }
},{timestamps:true});

//Export the model
module.exports = mongoose.model('Companys', companySchema);