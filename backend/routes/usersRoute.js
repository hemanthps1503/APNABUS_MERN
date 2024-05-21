const router = require('express').Router();
const User = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authmiddleware = require('../middlewares/authmiddleware');

router.post('/register', async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.send({
        message: 'User already exists',
        success: false,
        data: null,
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newuser = new User(req.body);
    await newuser.save();
    res.send({
      message: 'user created succesfully',
      success: true,
      data: null,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});
//login user

router.post('/login', async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (!userExists) {
      return res.send({
        message: 'User does not exist',
        success: false,
        data: null,
      });
    }
    if (userExists.isBlocked) {
      return res.send({
        message: ' User is blocked , Please contact the Admin !',
        success: false,
        data: null,
      });
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      userExists.password
    );
    if (!passwordMatch) {
      return res.send({
        message: 'Incorrect Password',
        success: false,
        data: null,
      });
    }
    const token = jwt.sign({ userId: userExists._id }, process.env.jwt_secret, {
      expiresIn: '1d',
    });
    res.send({
      message: 'User logged successfully',
      success: true,
      data: token,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});
//get user by id

router.post('/get-user-by-id', authmiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      message: 'User fetched Succesfully',
      success: true,
      data: user,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});
//get all users
router.post('/get-all-users', authmiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.send({
      message: 'Users fetched sucessfully',
      success: 'true',
      data: users,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

//update user
router.post('/update-user-permissions', authmiddleware, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.body._id, req.body);
    res.send({
      message: 'User permissions updated successfully',
      success: true,
      data: null,
    });
  } catch {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});
module.exports = router;
