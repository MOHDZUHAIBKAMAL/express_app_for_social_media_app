const express = require('express');
const PostController = require('../controllers/post_controller');

const router = express.Router();

router.get('/posts', PostController.getAllPosts);
router.post('/posts/explore', PostController.explore);
router.get('/posts/:post_id', PostController.getPost);
router.post('/posts', PostController.createPost);
router.put('/posts/:post_id', PostController.updatePost);
router.delete('/posts/:post_id', PostController.deletePost);

module.exports = router;
