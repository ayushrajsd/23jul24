const ProductModel = require("../models/product");

const createProduct = async (req, res) => {
  const body = req.body;
  try {
    console.log("2. creating a product");
    const product = await ProductModel.create({
      product_name: body.product_name,
      product_price: body.product_price,
      isInStock: body.isInStock,
      category: body.category,
      password: body.password,
      confirmPassword: body.confirmPassword,
    });
    console.log("3. prooduct created", product);
    return res
      .status(201)
      .json({ message: "Product created", product: product });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await ProductModel.find();
    console.log(allProducts);
    return res
      .status(200)
      .json({ message: "All products", products: allProducts });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  const id = req.params.id;
  const product = await ProductModel.findById(id);
  res.status(200).json({ message: "Product found", product: product });
};

const updateProductById = async (req, res) => {
  await ProductModel.findByIdAndUpdate(req.params.id, req.body);
  return res.status(201).json({ message: "Product updated" });
};

const deleteProductById = async (req, res) => {
  await ProductModel.findByIdAndDelete(req.params.id);
  return res.status(200).json({ message: "Product deleted" });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
