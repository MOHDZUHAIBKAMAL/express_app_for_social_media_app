const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/post_routes'); // Import your user routes

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use('/api', userRoutes);
// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/social_media_app_mongo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

app.listen(5002, () => {
  console.log('User app running on http://localhost:5002');
});
