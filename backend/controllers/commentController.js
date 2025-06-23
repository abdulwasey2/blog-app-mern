// backend/controllers/commentController.js

const asyncHandler = require('express-async-handler');
const Comment = require('../models/commentModel');
const Post = require('../models/postModel');

// @desc    Create a new comment for a post
// @route   POST /api/posts/:slug/comments
// @access  Private
const createComment = asyncHandler(async (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error('Comment text is required.');
  }

  // Find the post by slug to get its ID
  const post = await Post.findOne({ slug: req.params.slug });

  if (!post) {
    res.status(404);
    throw new Error('Post not found.');
  }

  const comment = await Comment.create({
    text,
    post: post._id,
    author: req.user._id, // from 'protect' middleware
  });

  // Populate author details for the newly created comment before sending it back
  const populatedComment = await Comment.findById(comment._id).populate('author', 'name');

  res.status(201).json(populatedComment);
});

// @desc    Get all comments for a post
// @route   GET /api/posts/:slug/comments
// @access  Public
const getCommentsForPost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });

  if (!post) {
    res.status(404);
    throw new Error('Post not found.');
  }

  const comments = await Comment.find({ post: post._id })
    .populate('author', 'name') // Populate author's name
    .sort({ createdAt: 'desc' }); // Show newest comments first

  res.status(200).json(comments);
});

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    res.status(404);
    throw new Error('Comment not found.');
  }

  // Check if the logged-in user is the author of the comment
  if (comment.author.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized to delete this comment.');
  }

  await comment.deleteOne();

  res.status(200).json({ message: 'Comment removed successfully.' });
});

module.exports = {
  createComment,
  getCommentsForPost,
  deleteComment,
};