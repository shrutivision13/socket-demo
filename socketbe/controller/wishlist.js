var express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Product = require('../models/product');
const Wishlist = require('../models/wishlist');

const addWishlist = async (product_id, user_id) => {
    console.log("🚀 ~ addWishlist ~ user_id:", user_id)

    try {
        const wishlist = await Wishlist.findOne({ user_id: user_id });
        if (wishlist) {
            console.log("🚀 ~ addWishlist ~ wishlist?.product?.includes(product_id):", wishlist?.product?.includes(product_id))
            if (wishlist?.product?.includes(product_id)) {

                wishlist.product = wishlist?.product?.filter(product => product?.toString() !== product_id);
            } else {
                wishlist.product = [...wishlist?.product, product_id]
            }
            console.log("🚀 ~ addWishlist ~ wishlist:", wishlist)

            await wishlist.save();
            return { data: wishlist, status: 200, message: !wishlist?.product?.includes(product_id) ? "Item removed from wishlist" : "Item added to wishlist" };

        }

        const newWishlist = new Wishlist();
        newWishlist.product = [product_id];
        newWishlist.user_id = user_id;
        console.log("🚀 ~ addWishlist ~ newWishlist:", newWishlist);
        await newWishlist.save()
        return { data: newWishlist, status: 200, message: "Item added to wishlist" };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}

const getAllWishlist = async (user_id, res) => {
    try {

        let data = await Wishlist.findOne({ user_id }).populate('product');
        return { data, status: 200, message: "Wishlist fetched successfully" };

        // return await Cart.paginate({}, { page: req?.query?.page||1, limit: req?.query?.limit }, (err, results) => {
        //   console.log("🚀 ~ carts ~ results:", results)
        //   if (err) return err
        //   return ({ total: results?.totalDocs || 0, data: results?.docs || [], status: 200 })
        // });
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}



const removeWishlist = async (body, res) => {
    try {
        const cart = await Cart.findById(body?.cart_id).populate('product_id.product');
        let productIndex = cart?.product_id?.findIndex(product => product?.product?._id.toString() === body?.product_id);

        cart.product_id = cart?.product_id?.filter(item => item?.product?._id != body?.product_id);
        await cart.save();
        return { message: 'Cart deleted', status: 200, data: cart };
        // if (!deletedCart) return { error: "Cart not found", status: 404 };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}
// const deleteCart = async (id, res) => {
//     try {
//         const deletedCart = await Cart.findByIdAndDelete(id);
//         if (!deletedCart) return { error: "Cart not found", status: 404 };
//         return { message: 'Cart deleted', status: 200 };
//     } catch (error) {
//         return { error: error.message, status: 500 };
//     }
// }
module.exports = {
    addWishlist, getAllWishlist, removeWishlist
}
