const path = require('path');
const User = require('../../shared/models/user_model.js');
const Follow = require('../../shared/models/user_follow_model.js');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

class UserService {
  // Get all users
  static async getAllUsers() {
    return await User.find(); // Using Mongoose to fetch all users
  }

  // Get user by username
  static async getUserByUsername(username) {
    return await User.findOne({ username });
  }

  // Create a new user
  static async createUser(username, email, password, full_name, bio) {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password before storing
    const user = new User({
      username,
      email,
      password: hashedPassword,
      full_name,
      bio,
    });
    await user.save();
    return user;
  }



  // Verify user for login
  static async verifyUser(username, password) {
    const user = await User.findOne({ username });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }


  static async followUser(follower_id, followed_id) {
    const existingFollow = await Follow.findOne({ follower_id, followed_id });
    if (existingFollow) {
      throw new Error('User already following.');
    }

    const follow = new Follow({ follower_id, followed_id });
    return await follow.save();
  }

  // Unfollow a user
  static async unfollowUser(follower_id, followed_id) {
    const follow = await Follow.findOneAndDelete({ follower_id, followed_id });
    if (!follow) {
      throw new Error('Follow relationship not found.');
    }
    return follow;
  }

  // Get all users a user is following
  static async getFollowing(follower_id) {
    return await Follow.find({ follower_id }).populate('followed_id', 'username email');
  }

  // Get all followers of a user
  static async getFollowers(followed_id) {
    return await Follow.find({ followed_id }).populate('follower_id', 'username email');
  }
}



module.exports = UserService;
