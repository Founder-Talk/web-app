const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const {
    createPost,
    getAllPosts,
    getMentorPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
    addComment
} = require('../controllers/postController');

// Create a post (with image upload)
router.post('/', authMiddleware, upload.single('post'), createPost);

// Get all posts
router.get('/', getAllPosts);

// Get all mentor posts
router.get('/mentors', getMentorPosts);

// Get a single post
router.get('/:id', getPostById);

// Update a post
router.put('/:id', authMiddleware, upload.single('post'), updatePost);

// Delete a post
router.delete('/:id', authMiddleware, deletePost);

// Like a post
router.post('/:id/like', authMiddleware, likePost);
// Unlike a post
router.post('/:id/unlike', authMiddleware, unlikePost);
// Add a comment to a post
router.post('/:id/comment', authMiddleware, addComment);

module.exports = router; 