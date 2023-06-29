const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const path = require("path");
const getUser = require(path.join(__dirname, "../", "controller", "users", "getUser.controller"));
const { updateUserFields } = require("../controller/users/updateUser.contoroller.js");
const { updateUserPassword } = require("../controller/users/updateUser.contoroller.js");

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

    if (req.body.newPassword) {
      const matchPasswords = await bcrypt.compare(req.body.currentPassword, user.password);
      if (!matchPasswords) {
        throw new Error("Passwords does not match");
      }

      await updateUserPassword(user, req.body);
    } else {
      // const isvalidAddress = await addressValidator(req.body.country, req.body.city, req.body.street, req.body.houseNumber);
      // if (!isvalidAddress) {
      //   throw new Error("Address does not exist");
      // }
      await updateUserFields(user, req.body);
    }

    await user.save();
  } catch (error) {
    if (error.message === "Address does not exist") {
      console.log(error.message);
      res.status(400).json({ error: error.message });
    } else if (error.message === "Passwords does not match") {
      console.log(error.message);
      res.status(400).json({ error: error.message });
    } else {
      res.redirect("/login/");
    }
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
