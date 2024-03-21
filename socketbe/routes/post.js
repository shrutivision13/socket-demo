var express = require('express');
const upload = require('../utils/multer');
const authentication = require('../middleware/authentication');
const { addPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controller/post');
var router = express.Router();

router.post('/add',authentication,upload.single("image"), addPost);

router.get('',getAllPosts);

router.get('/:id',authentication, getPostById);

router.put('/:id',upload.single("image"),authentication, updatePost);

router.delete('/:id',authentication, deletePost);


module.exports = router;
