const { default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")

const cartSchema = new mongoose.Schema({
    product_id: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        }, quantity: Number
    }],

    user_id: String


}, { timestamps: true });

cartSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Cart", cartSchema)