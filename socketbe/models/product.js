const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    sku: String,
    stockQty: Number,
    category: String,
    images: [String],
    discount: {
        type: String,
        default: 0
    }
});

module.exports = mongoose.model('Product', productSchema);