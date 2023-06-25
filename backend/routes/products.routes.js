const express = require("express");
const router = express.Router();
const path = require("path");
const { createProduct } = require(path.join(
  __dirname,
  "../",
  "controller",
  "products",
  "products.controller"
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
module.exports = router;
