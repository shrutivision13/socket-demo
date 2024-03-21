var express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

const addComment = async (req, res) => {
    console.log("🚀 ~ addComment ~ req:", req)
    try {
        const comment = new Comment(req.body);

        comment.user_id = req.user._id
        await comment.save();
        res.status(200).json({ comment, message: 'Comment sent successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getChildrensForComments(id, parent_id = null,childIds) {
    console.log("🚀 ~ getChildrensForComments ~ parent_id:", parent_id)


    const results = parent_id ? await Comment.find({ post_id: id, parent_id }).populate('user_id') : await Comment.find({ post_id: id }).populate('user_id')
    console.log("🚀 ~ getChildrensForComments ~ results:", results)
    const childrens = [];
    if (results?.length)
        for (const row of results) {
            console.log("🚀 ~ getChildrensForComments ~ row:", row)
            const comment = { ...row?._doc, child: [] }
            comment.child = await getChildrensForComments(row?.post_id,row._id,childIds);
            childIds.push(...comment?.child?.map(child=>child?._id?.toString()))
            console.log("🚀 ~ getChildrensForComments ~ await getChildrensForComments(row._id);:", await getChildrensForComments(row._id), comment)
            childrens.push(comment);
        }
    console.log("🚀 ~ getChildrensForComments ~ childrens:", childrens)

    return childrens;
}

const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json({ comments, message: 'Comments fetched successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getAllCommentsForPosts = async (req, res) => {
    try {
        console.log("🚀 ~ getAllCommentsForPosts ~ req?.query:", req?.query)
        let childIds = []
        const comments = await getChildrensForComments(req?.params?.post_id,null,childIds);
        console.log("🚀 ~ getAllCommentsForPosts ~ childIds:", childIds)

        res.status(200).json({ comments:comments?.filter(comment=>!childIds.includes(comment?._id?.toString())), message: 'Comments fetched successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json({ error: 'Comment not found' });
        res.status(200).json({ comment, message: 'Comment fetched successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateComment = async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedComment) return res.status(404).json({ error: 'Comment not found' });
        if (req?.file) {
            req.body.file = req?.file?.path
        }
        res.status(200).json({ comment: updatedComment, message: 'Comment updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteComment = async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) return res.status(404).json({ error: 'Comment not found' });
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = {
    addComment, getAllComments, getCommentById, updateComment, deleteComment, getAllCommentsForPosts
}