// hPXNJMXejNnv1Y3j
// mongodb+srv://ayushrajsd:hPXNJMXejNnv1Y3j@cluster0.z2fazic.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// mongoose -> schemas -> models and with help of models we can perform CRUD operations

const express = require("express");
const connectDB = require("./config/db");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
connectDB();
app.use(express.json());

// routes handling
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.listen(3001, function () {
  console.log("Server started");
});
