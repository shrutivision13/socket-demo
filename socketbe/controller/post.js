var express = require('express');
const router = express.Router();
const Post = require('../models/post');

const addPost = async (req, res) => {
    console.log("🚀 ~ addPost ~ req:", req)
    try {
        const post = new Post(req.body);
        if(req?.file){
            post.image = req?.file?.path
          }
          post.user_id = req.user._id
        await post.save();
        res.status(200).json({post, message: 'Post sent successfully'});
    } catch (error) {
         res.status(500).json({error: error.message});
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user_id');
        res.status(200).json({posts, message: 'Posts fetched successfully'});
    } catch (error) {
         res.status(500).json({error: error.message});
    }
}

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({error:'Post not found'});
        res.status(200).json({post, message: 'Post fetched successfully'});
    } catch (error) {
         res.status(500).json({error: error.message});
    }
}

const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) return res.status(404).json({error:'Post not found'});
        if(req?.file){
          req.body.file =   req?.file?.path
        }
        res.status(200).json({post:updatedPost, message: 'Post updated successfully'});
    } catch (error) {
         res.status(500).json({error: error.message});
    }
}

const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({error:'Post not found'});
        res.status(200).json({message:"Post deleted successfully"});
    } catch (error) {
         res.status(500).json({error: error.message});
    }
}
module.exports = {
    addPost, getAllPosts, getPostById, updatePost, deletePost
}