// backend/controllers/postController.js

const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  // 1. featuredImage ko request body se hasil karein
  const { title, content, category, tags, featuredImage } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error('Title and content are required');
  }

  const post = new Post({
    title,
    content,
    featuredImage, // 2. Post object mein add karein
    category,
    tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
    author: req.user._id,
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

// ... getPosts aur getPostBySlug wese hi rahenge ...
// @desc    Get all posts with pagination
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const pageSize = 10; // Number of posts per page
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i', // case-insensitive
        },
      }
    : {};

  const count = await Post.countDocuments({ ...keyword });
  const posts = await Post.find({ ...keyword })
    .populate('author', 'name') // Populate author's name
    .sort({ createdAt: -1 }) // Sort by latest
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ posts, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get single post by slug
// @route   GET /api/posts/:slug
// @access  Public
const getPostBySlug = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate('author', 'name');

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});


// @desc    Update a post
// @route   PUT /api/posts/:slug
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  // 3. featuredImage ko request body se hasil karein
  const { title, content, category, tags, featuredImage } = req.body;
  const post = await Post.findOne({ slug: req.params.slug });

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post.author.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized to update this post');
  }

  post.title = title || post.title;
  post.content = content || post.content;
  post.category = category || post.category;
  post.tags = tags ? tags.split(',').map(tag => tag.trim()) : post.tags;
  post.featuredImage = featuredImage || post.featuredImage; // 4. Update karein
  
  const updatedPost = await post.save();
  res.json(updatedPost);
});

// ... deletePost waisa hi rahega ...
// @desc    Delete a post
// @route   DELETE /api/posts/:slug
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    // Check ownership
    if (post.author.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('User not authorized to delete this post');
    }

    await post.deleteOne();
    res.json({ message: 'Post removed successfully' });
});


module.exports = { createPost, getPosts, getPostBySlug, updatePost, deletePost };