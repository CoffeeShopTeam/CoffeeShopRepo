const express = require("express");
const router = express.Router();
const path = require("path");
const { requireLogin } = require("../middleware");

router.use(requireLogin);

router.get("/", (req, res) => {
  res.render(path.join(__dirname, "..", "views", "Cart", "Cart"));
});

module.exports = router;
