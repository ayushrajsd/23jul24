// hPXNJMXejNnv1Y3j
// mongodb+srv://ayushrajsd:hPXNJMXejNnv1Y3j@cluster0.z2fazic.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// mongoose -> schemas -> models and with help of models we can perform CRUD operations

const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.use(express.json());

const dbUrl = `mongodb+srv://ayushrajsd:hPXNJMXejNnv1Y3j@cluster0.z2fazic.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose
  .connect(dbUrl)
  .then(function (connection) {
    console.log("Connected to db");
  })
  .catch(function (err) {
    console.log(err);
  });

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
      unique: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    isInStock: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    confirmPassword: {
      type: String,
      required: true,
      minLength: 8,
      validate: {
        validator: function () {
          return this.password == this.confirmPassword;
        },
        message: "Password and confirm password do not match",
      },
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("products", productSchema);

app.listen(3000, function () {
  console.log("Server started");
});

app.post("/api/products", async (req, res) => {
  const body = req.body;
  try {
    const product = await ProductModel.create({
      product_name: body.product_name,
      product_price: body.product_price,
      isInStock: body.isInStock,
      category: body.category,
      password: body.password,
      confirmPassword: body.confirmPassword,
    });
    console.log(product);
    return res
      .status(201)
      .json({ message: "Product created", product: product });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const allProducts = await ProductModel.find();
    console.log(allProducts);
    return res
      .status(200)
      .json({ message: "All products", products: allProducts });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await ProductModel.findById(id);
  res.status(200).json({ message: "Product found", product: product });
});

app.put("/api/products/:id", async (req, res) => {
  await ProductModel.findByIdAndUpdate(req.params.id, req.body);
  return res.status(201).json({ message: "Product updated" });
});

app.delete("/api/products/:id", async (req, res) => {
  await ProductModel.findByIdAndDelete(req.params.id);
  return res.status(200).json({ message: "Product deleted" });
});
