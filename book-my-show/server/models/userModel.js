const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "partner"],
    required: true,
    default: "user",
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
