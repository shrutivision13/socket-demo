const { default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")

const designationSchema = new mongoose.Schema({
    designation: String,

}, { timestamps: true });

designationSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Designation", designationSchema)