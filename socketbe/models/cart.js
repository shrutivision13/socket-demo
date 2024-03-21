const { default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")

const cartSchema = new mongoose.Schema({
    product_id: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        }, quantity: Number
    }],
    status: {
        type: String,
        enum: ["In cart", "Ordered", "Delivered", "Cancelled", "Returned"],
        default: "In cart"
    },
    transactionId: String,
    transactionStatus: {
        type: String,
        enum: ["Failed", "Success", "Pending", "Refund"],
        default: "Pending"
    },
    networkTransId: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    platform: {
        type: String,
        enum: ["paypal", "stripe", "authorized"],
        default: "paypal"
    },
    cardNumber: {
        type: String
    },
    expiryDate: {
        type: String
    }


}, { timestamps: true });

cartSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Cart", cartSchema)