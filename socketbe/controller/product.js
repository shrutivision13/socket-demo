var express = require('express');
const router = express.Router();
const Product = require('../models/product');

const addProduct = async (body, res) => {
    console.log("🚀 ~ addProduct ~ body:", body)
    const product = new Product(body);
    try {
        await product.save();
        return { data: product, status: 200, message: "Product added successfully" };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}

const getAllProducts = async (query, res) => {
    try {
        console.log("🚀 ~ products ~ req.query:", query)
        let search = {}
        if (query?.search) {
            search = { ...search, name: { $regex: query?.search, $options: "i" } }
        }
        if (query?.category) {
            search = { ...search, category: { $regex: query?.category, $options: "i" } }
        }
        return await Product.find(search);
        // return await Product.paginate({}, { page: req?.query?.page||1, limit: req?.query?.limit }, (err, results) => {
        //   console.log("🚀 ~ products ~ results:", results)
        //   if (err) return err
        //   return ({ total: results?.totalDocs || 0, data: results?.docs || [], status: 200 })
        // });
    } catch (error) {
        console.log("🚀 ~ getAllProducts ~ error:", error)
        return { error: error.message, status: 500 };
    }
}

const getProductById = async (id, res) => {
    console.log("🚀 ~ getProductById ~ id:", id)
    try {
        const product = await Product.findById(id);
        if (!product) return { error: "Product not found", status: 404 };
        return { data: product, status: 200 };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}

const updateProduct = async (body, res) => {
    console.log("🚀 ~ updateProduct ~ body:", body)
    try {
        const updatedProduct = await Product.findByIdAndUpdate(body._id, body, { new: true });
        if (!updatedProduct) return { error: "Product not found", status: 404 };
        return { data: updatedProduct, status: 200, message: "Product updated successfully" };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}

const deleteProduct = async (id, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return { error: "Product not found", status: 404 };
        return { message: 'Product deleted', status: 200 };
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}
module.exports = {
    addProduct, getAllProducts, getProductById, updateProduct, deleteProduct
}