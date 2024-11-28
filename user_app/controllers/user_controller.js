const UserService = require('../services/user_service');
const UserView = require('../views/user_view');
const mongoose = require('mongoose');
const path = require('path');
const User = require('../../shared/models/user_model.js');
const Follow = require('../../shared/models/user_follow_model.js');
const bcrypt = require('bcrypt');

class UserController {
  // Get all users
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      return res.status(200).json(UserView.renderUsers(users));
    } catch (error) {
      return res.status(500).json(UserView.renderError('Error fetching users.'));
    }
  }

  // Get user by username
  static async getUser(req, res) {
    const { username } = req.params;
    try {
      const user = await UserService.getUserByUsername(username);
      if (!user) {
        return res.status(404).json(UserView.renderError('User not found'));
      }
      return res.status(200).json(UserView.renderUser(user));
    } catch (error) {
      return res.status(500).json(UserView.renderError('Error fetching user.'));
    }
  }

  // Create a new user
  static async createUser(req, res) {
    const { username, email, password, full_name = '', bio = '' } = req.body;
    try {
      const user = await UserService.createUser(username, email, password, full_name, bio);
      return res.status(201).json(UserView.renderSuccess('User created successfully', user._id));
    } catch (error) {
      return res.status(500).json(UserView.renderError('Error creating user.'));
    }
  }

  // User login
  static async loginUser(req, res) {
    const { username, password } = req.body;
    try {
      const user = await UserService.verifyUser(username, password);
      if (user) {
        return res.status(200).json(UserView.renderSuccess('Login successful', user._id));
      }
      return res.status(401).json(UserView.renderError('Invalid username or password'));
    } catch (error) {
      return res.status(500).json(UserView.renderError('Error during login.'));
    }
  }

  static async followUser(req, res) {
    const { follower_id, followed_id } = req.body;

    if (!follower_id || !followed_id) {
      return res.status(400).json({ error: 'Both follower and followed IDs are required.' });
    }

    try {
      // Ensure both IDs are ObjectIds
      const follower = mongoose.Types.ObjectId(follower_id);
      const followed = mongoose.Types.ObjectId(followed_id);

      // Check if the user is already following the other user
      const existingFollow = await Follow.findOne({ follower_id: follower, followed_id: followed });
      if (existingFollow) {
        return res.status(400).json({ error: 'User already following.' });
      }

      // Create the follow relationship
      const follow = new Follow({ follower_id: follower, followed_id: followed });
      await follow.save();

      return res.status(201).json({ message: 'Followed successfully', follow });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error following user.' });
    }
  }

  // Function to unfollow another user
  static async unfollowUser(req, res) {
    const { follower_id, followed_id } = req.body;

    if (!follower_id || !followed_id) {
      return res.status(400).json({ error: 'Both follower and followed IDs are required.' });
    }

    try {
      // Ensure both IDs are ObjectIds
      const follower = mongoose.Types.ObjectId(follower_id);
      const followed = mongoose.Types.ObjectId(followed_id);

      // Find and delete the follow relationship
      const follow = await Follow.findOneAndDelete({ follower_id: follower, followed_id: followed });
      if (!follow) {
        return res.status(404).json({ error: 'Follow relationship not found.' });
      }

      return res.status(200).json({ message: 'Unfollowed successfully', follow });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error unfollowing user.' });
    }
  }
}




module.exports = UserController;
