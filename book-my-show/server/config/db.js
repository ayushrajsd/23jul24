const mongoose = require("mongoose");

const dbURL = process.env.DB_URL;
console.log(dbURL);

const connectDb = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;
