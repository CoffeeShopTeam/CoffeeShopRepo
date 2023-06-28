const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  const products = Products.getProducts(); // Get the products using the Products class
  console.log(products);
  res.render("cart.ejs", { cartTotal });
});

module.exports = router;
