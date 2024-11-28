const mongoose = require('mongoose');
const { Schema } = mongoose;

// User model import (ensure this is the correct path)
const User = require('../models/user_model'); 

const postSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId, // Use ObjectId for MongoDB references
      ref: 'User', // Reference to the User model
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now, // MongoDB handles date with default now
    },
    updated_at: {
      type: Date,
      default: Date.now, // Will update this manually when updating the post
    },
    visibility: {
      type: String,
      enum: ['public', 'private', 'followers_only'], // Valid visibility values
      default: 'public',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
