const { default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")

const employeeSchema = new mongoose.Schema({
    name: String,
    salary: Number,
    department_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
    },
    designation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Designation",
    },
    branch_id: {
        type: String,
    },
    birth_date: Date,
    mobile_no: { type: String, unique: true },
    email: { type: String, unique: true },

}, { timestamps: true });

employeeSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Employee", employeeSchema)