const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.render("contactUs/contactUs");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
