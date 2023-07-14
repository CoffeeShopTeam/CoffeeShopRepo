const express = require("express");
const router = express.Router();
const path = require("path");
const { createUser } = require("../controller/users");

router.get("/", (req, res, next) => {
  res.render(path.join(__dirname, "../", "views", "signup", "signUpPage"));
});

router.post("/", async (req, res, next) => {
  try {
    const userDetails = req.body;
    await createUser(userDetails);
    res.redirect("/")
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
