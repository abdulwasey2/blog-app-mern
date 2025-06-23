// backend/routes/postRoutes.js

const express = require('express');
const router = express.Router();
const { 
  getPosts, 
  getPostBySlug, 
  createPost, 
  updatePost,
  deletePost
} = require('../controllers/postController');
const { protect } = require('../middlewares/authMiddleware');

// Public routes
router.get('/', getPosts);
router.get('/:slug', getPostBySlug);

// Private routes
router.post('/', protect, createPost);
router.put('/:slug', protect, updatePost);
router.delete('/:slug', protect, deletePost);

module.exports = router;