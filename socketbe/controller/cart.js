var express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Product = require('../models/product');


const getAllOrders = async (query, user_id, res) => {
    try {
        return await Cart.paginate({ user_id, status: { $ne: "In cart" } }, { page: query?.page || 1, limit: query?.limit || 50, populate: "product_id.product" }, (err, results) => {
            if (err) return err
            return ({ total: results?.totalDocs || 0, data: results?.docs || [], status: 200 })
        });
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}


const getAllTransaction = async (query, user_id, res) => {
    try {
        return await Cart.paginate({ status: { $ne: "In cart" } }, { page: query?.page || 1, limit: query?.limit || 10, populate: ["user_id", "product_id.product"] }, (err, results) => {
            if (err) return err
            return ({ total: results?.totalDocs || 0, data: results?.docs || [], status: 200 })
        });
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}

const addCart = async (body, userId) => {

    try {
        const cartFind = await Cart.findOne({ user_id: body?.user_id, status: "In cart" });
        if (cartFind) {
            cartFind.user_id = userId
            let productIndex = cartFind?.product_id?.findIndex(product => (product?.product).toString() === body?.product_id);
            if (productIndex > -1)
                cartFind.product_id[productIndex] = { product: body?.product_id, quantity: body?.quantity }

            else
                cartFind.product_id.push({ product: body?.product_id, quantity: body?.quantity || 1 })

            await cartFind.save();
            return { data: await Cart.findById(cartFind?._id)?.populate('product_id.product'), status: 200, message: "Cart updated successfully" };

        }

        const cart = new Cart(body);
        cart.user_id = userId
        cart.product_id = [{ product: body?.product_id, quantity: 1 }];
        (await cart.save()).populate('product_id');
        return { data: cart, status: 200, message: "Cart added successfully" };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}

const getAllCarts = async (user_id, res) => {
    try {

        return await Cart.findOne({ user_id, status: "In cart" }).populate('product_id.product');

    } catch (error) {
        return { error: error.message, status: 500 };
    }
}

const getCartById = async (id, res) => {
    try {
        const cart = await Cart.findById(id).populate('product_id.product');
        if (!cart) return { error: "Cart not found", status: 404 };
        return { data: cart, status: 200 };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}

const updateCart = async (id, body) => {
    console.log("🚀 ~ updateCart ~ id:", id, body)
    try {
        const updatedCart = await Cart.findByIdAndUpdate(id, body, { new: true });
        updatedCart?.product_id?.map(async (item) => {
            await Product.updateOne({ _id: item?.product }, { $inc: { stockQty: -parseInt(item?.quantity) } })
        })
        if (!updatedCart) return { error: "Cart not found", status: 404 };
        return { data: updatedCart, status: 200, message: "Cart updated successfully" };
    } catch (error) {
        console.log("🚀 ~ updateCart ~ error:", error)
        return { error: error.message, status: 500 };
    }
}

const rmeoveCart = async (body, res) => {
    console.log("🚀 ~ rmeoveCart ~ body:", body)
    try {
        const cart = await Cart.findById(body?.cart_id).populate('product_id.product');

        cart.product_id = cart?.product_id?.filter(item => item?.product?._id != body?.product_id);
        await cart.save();
        return { message: 'Cart deleted', status: 200, data: cart };
        // if (!deletedCart) return { error: "Cart not found", status: 404 };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}

module.exports = {
    addCart, getAllCarts, getCartById, updateCart, rmeoveCart, getAllOrders, getAllTransaction
}