const express = require("express");
const router = express.Router();
const path = require("path");
const {
  createProduct,
  getAllProducts,
  getProductById,
  EditProductById,
  deleteProduct,
} = require(path.join(
  __dirname,
  "../",
  "controller",
  "products",
  "products.controller"
));
const getProduct = require(path.join(
  __dirname,
  "../",
  "middleware",
  "getProduct"
));

router.get("/", (req, res, next) => {
  res.render(path.join(__dirname, "../", "views", "products", "createProduct"));
});

router.post("/", async (req, res, next) => {
  try {
    await createProduct(req, res);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

router.get("/", getAllProducts);

router.put("/:id", getProduct, EditProductById);

router.delete("/", async (req, res) => {
  try {
    await deleteProduct(req, res);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

module.exports = router;
