const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config(); // load the environment variables into process.env

const userRouter = require("./routes/userRoutes");

const connectDb = require("./config/db");
connectDb();

/** * Routes */
app.use((req, res, next) => {
  console.log("request received on server", req.body, req.url);
  next();
});
app.use("/api/users", userRouter);

app.listen(8082, () => {
  console.log("Server is up and running on port 8082");
});
