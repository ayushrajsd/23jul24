const express = require("express");

const userRoute = express.Router();

const { createUser } = require("../controllers/userController");

userRoute.post("/", createUser);

module.exports = userRoute;
