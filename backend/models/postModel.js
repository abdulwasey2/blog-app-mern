// backend/models/postModel.js

const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true, // Removes whitespace from both ends
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  slug: {
    type: String,
    unique: true, // Slugs must be unique for unique URLs
  },
  content: {
    type: String,
    required: [true, 'Please add content'],
  },
  featuredImage: {
    type: String,
    default: 'no-image.jpg', // Default image if none is uploaded
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // Establishes a relationship with the User model
    required: true,
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    default: 'General',
  },
  tags: [String], // An array of strings for tags
}, {
  timestamps: true,
});

// Middleware (pre-save hook) to create a slug from the title before saving
postSchema.pre('save', function (next) {
  // Only generate a new slug if the title has changed
  if (this.isModified('title')) {
    this.slug = slugify(this.title, {
      lower: true,    // Convert to lowercase
      strict: true,   // Remove special characters strictly
      remove: /[*+~.()'"!:@]/g // Additional characters to remove
    });
  }
  next();
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;