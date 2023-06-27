// in tests till i'll figure out the cart logic
const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/details", (req, res, next) => {
  res.render(path.join(__dirname, "../", "views", "Cart", "Cart"));
});
