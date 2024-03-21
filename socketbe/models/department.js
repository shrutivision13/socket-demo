const { default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")

const departmentSchema = new mongoose.Schema({
    department: String,

}, { timestamps: true });

departmentSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Department", departmentSchema)