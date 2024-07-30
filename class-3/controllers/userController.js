const UserModel = require("../models/userModel");

const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await UserModel.create({ name, email });
    return res.status(201).json({ message: "User created", user: user });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = { createUser };
