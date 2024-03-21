const { default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")

const wishlistSchema = new mongoose.Schema({
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }


}, { timestamps: true });

wishlistSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Wishlist", wishlistSchema)