const express = require("express");
const router = express.Router();
const path = require("path");
const getUser = require(path.join(__dirname, "../", "controller", "users", "getUser.controller"));
const { updateUserFields } = require("../controller/users/updateUser.contoroller.js");

let count = 0;

router.get("/", (req, res, next) => {
  res.redirect("/account/details/");
});

router.get("/details", async (req, res, next) => {
  try {
    const { email } = req.session.data;
    const user = await getUser(email);
    console.log(user);

    res.render(path.join(__dirname, "..", "views", "account", "accountDetails", "accountDetails"), { user });
  } catch (error) {
    res.redirect("/login/");
  }
});
router.put("/details", async (req, res, next) => {
  try {
    const { email } = req.session.data;
    const user = await getUser(email);

    await updateUserFields(user, req.body);
    // res.redirect("/account/details");
  } catch (error) {
    res.redirect("/login/");
  }
});

router.get("/orders", (req, res, next) => {
  res.render(path.join(__dirname, "..", "views", "account", "accountOrders", "accountOrders"));
});

router.get("/products", (req, res, next) => {
  res.render(path.join(__dirname, "..", "views", "account", "accountProducts", "accountProducts"));
});

router.get("/orders/:orderId", (req, res, next) => {
  const { orderId } = req.params;
  console.log(orderId);
  res.render(path.join(__dirname, "..", "views", "account", "accountViewOrder", "accountViewOrder"));
});

router.get("/whishlist", (req, res, next) => {
  res.render(path.join(__dirname, "..", "views", "account", "accountWishlist", "accountWishlist"));
});
module.exports = router;
