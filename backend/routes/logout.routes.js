const express = require("express");
const router = express.Router();
const path = require("path");
const { requireLogin } = require("../middleware/requireLogin.middleware");
const { logout } = require("../controller/logout")

router.use("/", requireLogin);

router.get("/", logout);

module.exports = router;