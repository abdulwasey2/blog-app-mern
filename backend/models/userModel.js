// backend/models/userModel.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true, // Ensures no two users can have the same email
    match: [ // Regex to validate email format
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6, // Enforces a minimum password length
    select: false, // Password will not be sent back in queries by default
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Middleware (pre-save hook) to hash the password before saving a user
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) {
    next();
  }

  // Generate a salt with 10 rounds
  const salt = await bcrypt.genSalt(10);
  // Hash the password with the salt
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method on the user model to compare entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  // bcrypt.compare returns a boolean
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;