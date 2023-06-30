const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", async (req, res) => {
  try {
    res.render(path.join(__dirname, "..", "views", "privacy", "privacyPolicy", "privacyPolicy"));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
