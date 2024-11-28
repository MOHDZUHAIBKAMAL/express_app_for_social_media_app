const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user_controller');

// GET all users
router.get('/users', UserController.getAllUsers);

// GET user by username
router.get('/users/:username', UserController.getUser);

// POST to follow a user
router.post('/users/follow', UserController.followUser);

// POST to create a new user
router.post('/users', UserController.createUser);

// POST to login a user
router.post('/users/login', UserController.loginUser);


module.exports = router;
