const express = require("express");
const router = express.Router();
const {
  getAllProducts,
} = require("../controller/products/products.controller");

const {
  getMostOrderedProducts,
} = require("../controller/orders/orders.controller");

router.get("/", async (req, res) => {
  try {
    const mostOrderedProducts = await getMostOrderedProducts(6);

    res.render("homePage/homePage", { sortedProducts: mostOrderedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
