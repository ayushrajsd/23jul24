const mongoose = require("mongoose");
const dbUrl = `mongodb+srv://ayushrajsd:hPXNJMXejNnv1Y3j@cluster0.z2fazic.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to db");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
