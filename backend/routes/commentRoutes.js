// backend/routes/commentRoutes.js

const express = require('express');
const router = express.Router();
const {
  createComment,
  getCommentsForPost,
  deleteComment,
} = require('../controllers/commentController');
const { protect } = require('../middlewares/authMiddleware');

// Route to get all comments for a post and create a new one
router
  .route('/posts/:slug/comments')
  .get(getCommentsForPost)
  .post(protect, createComment);

// Route to delete a specific comment
router.route('/comments/:id').delete(protect, deleteComment);

module.exports = router;