const express = require("express");
const router = express.Router();
const {
  getAllProducts,
} = require("../controller/products/products.controller");

router.get("/", async (req, res) => {
  try {
    // Fetch all products
    const products = await getAllProducts();

    // Render the EJS template and pass the products as a variable
    res.render("homePage/homePage", { products: products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
