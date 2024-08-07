const express = require("express");

const {
  createNewProduct,
  getAllProducts,
  getProductById,
  getProductBySubCategoryById,
  updateProductById,
  deleteProductById,
  getAllProductsByCategoryId
} = require("../controllers/products");
const authentication = require("../middleware/authentication");
const productsRouter = express.Router();

productsRouter.post("/", authentication, createNewProduct);
productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", getProductById);
productsRouter.get("/subCategory/:id", getProductBySubCategoryById);
productsRouter.put("/:id", authentication, updateProductById);
productsRouter.delete("/:id", deleteProductById);
productsRouter.get("/category/:id", getAllProductsByCategoryId);

module.exports = productsRouter;
