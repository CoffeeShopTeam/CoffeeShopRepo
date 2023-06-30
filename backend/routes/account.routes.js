const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");
const { addressValidator } = require("../models/users/user.validator.js");
const getUser = require(path.join(__dirname, "../", "controller", "users", "getUser.controller"));
const { updateUserFields } = require("../controller/users/updateUser.contoroller.js");
const { updateUserPassword } = require("../controller/users/updateUser.contoroller.js");

router.use("/", (req, res, next) => {
  try {
    const { type } = req.session.data;
    req.type = type;
    next();
  } catch (error) {
    res.redirect("/login/");
  }
});

router.get("/", (req, res, next) => {
  res.redirect("/account/details/");
});

router.get("/navbar", (req, res, next) => {
  try {
    const type = req.type;
    res.render(path.join(__dirname, "..", "views", "account", "account"), { type });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/details", async (req, res, next) => {
  try {
    const type = req.type;

    const { email } = req.session.data;
    const user = await getUser(email);
    res.render(path.join(__dirname, "..", "views", "account", "accountDetails", "accountDetails"), { user });
  } catch (error) {
    res.status(500).send(error.message);
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
      const isvalidAddress = await addressValidator(req.body.country, req.body.city, req.body.street, req.body.houseNumber);
      if (!isvalidAddress) {
        throw new Error("Address does not exist");
      }
      await updateUserFields(user, req.body);
    }
    await user.save();
    res.send("success");
  } catch (error) {
    console.log(error.message);

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
  try {
    const type = req.type;
    res.render(path.join(__dirname, "..", "views", "account", "accountOrders", "accountOrders"), { type });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/products", (req, res, next) => {
  try {
    const type = req.type;
    if (!["supplier", "admin"].includes(type)) {
      res.status(404).send("unauthorized");
    }
    res.render(path.join(__dirname, "..", "views", "account", "accountProducts", "accountProducts"), { type });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/orders/:orderId", (req, res, next) => {
  try {
    const type = req.type;
    const { orderId } = req.params;
    console.log(orderId);
    res.render(path.join(__dirname, "..", "views", "account", "accountViewOrder", "accountViewOrder"), { type });
  } catch (error) {}
});

router.get("/whishlist", (req, res, next) => {
  try {
    const type = req.type;
    if ("customer" !== type) {
      res.status(404).send("unauthorize");
    }
    res.render(path.join(__dirname, "..", "views", "account", "accountWishlist", "accountWishlist"));
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/dashboard", (req, res, next) => {
  try {
    const type = req.type;
    if (!["admin"].includes(type)) {
      res.status(404).send("unauthorized");
    }
    res.render(path.join(__dirname, "..", "views", "account", "accountDashboard", "accountDashboard"));
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
