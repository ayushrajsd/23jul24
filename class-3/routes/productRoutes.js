const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/productController");

const productRouter = express.Router();

productRouter.post("/", createProduct); // /api/products/ - post

productRouter.get("/", getAllProducts); // /api/products/ - get

productRouter.get("/:id", getProductById); // /api/products/123 - get

productRouter.put("/:id", updateProductById); // /api/products/123 - put

productRouter.delete("/:id", deleteProductById); // /api/products/123 - delete

module.exports = productRouter;
