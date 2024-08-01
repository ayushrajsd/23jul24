const express = require("express");
const User = require("../models/userModel");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  // api/users/register
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({ success: false, message: "User already exists" });
    }
    const newUser = new User(req.body); // create a new user document
    await newUser.save(); // save the document to the database

    res.send({
      success: true,
      message: "Registration Successful, Please Login",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User not found, Please register",
      });
    }

    if (req.body.password !== user.password) {
      return res.send({ success: false, message: "Invalid Password" });
    }
    res.send({ success: true, message: "Login Successful" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
