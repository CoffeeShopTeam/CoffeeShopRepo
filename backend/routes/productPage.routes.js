const express = require("express");
const router = express.Router();
const path = require("path");
const productsController = require(path.join(
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

router.get("/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await productsController.getProductById(productId);
    const relatedProducts = await productsController.getProductsByCategory(
      product.productCategory,
      3
    );
    res.render("ProductPage/productPage", { product, relatedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
