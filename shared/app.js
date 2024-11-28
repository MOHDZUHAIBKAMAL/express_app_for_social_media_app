const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Import models
const User = require('./models/user_model');
const Post = require('./models/post_model');

// Middleware to parse JSON requests
app.use(express.json());

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// Initialize the database connection
connectDB();

// Export the app for use in other parts of the application (e.g., routes, controllers)
module.exports = app;

