var express = require('express');
const authentication = require('../middleware/authentication');
const { addComment, getAllComments, getCommentById, updateComment, deleteComment, getAllCommentsForPosts } = require('../controller/comment');
var router = express.Router();

router.post('/add',authentication, addComment);

router.get('',authentication, getAllComments);
router.get('/:post_id', getAllCommentsForPosts);

router.get('/:id',authentication, getCommentById);

router.put('/:id',authentication, updateComment);

router.delete('/:id',authentication, deleteComment);


module.exports = router;
