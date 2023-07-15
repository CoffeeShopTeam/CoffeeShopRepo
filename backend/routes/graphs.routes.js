const express = require("express");
const router = express.Router();
const path = require("path");
const productsController = require(path.join(__dirname, "../", "controller", "products", "products.controller"));
const getAllUsersCountry = require(path.join(__dirname, "../", "controller", "users", "getAllUsersCountry.controller"));

router.get("/", async (req, res) => {
  try {
    const products = await productsController.getAllProducts();
    const users = await getAllUsersCountry();
    res.render(path.join(__dirname, "..", "views", "statisticalGraphs", "statisticalGraphs"), { products, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
