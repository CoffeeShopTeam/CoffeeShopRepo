const express = require("express");
const router = express.Router();
const path = require("path");
const productsController = require(path.join(__dirname, "../", "controller", "products", "products.controller"));

router.get("/", async (req, res) => {
  try {
    const products = await productsController.getAllProducts();
    res.render(path.join(__dirname, "..", "views", "statisticalGraphs", "statisticalGraphs"), { products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
