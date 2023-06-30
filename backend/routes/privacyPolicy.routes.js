const express = require("express");
const router = express.Router();
const path = require("path");

router.use("/", (req, res, next) => {
  try {
    const { type } = req.session.data;
    req.type = type;
    next();
  } catch (error) {
    res.redirect("/login/");
  }
});

module.exports = router;
