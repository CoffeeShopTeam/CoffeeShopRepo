const express = require("express");
const router = express.Router();
const path = require("path");

router.use("/", (req, res, next) => {
  try {
    const { type } = req.session.data;
    req.type = type;
    next();
  } catch (error) {
    res.redirect('/login/');
  }
});

router.get("/", (req, res, next) => {
  res.redirect("/account/details/");
});

router.get('/navbar', (req, res, next) => {
  try {
    const type = req.type;
    res.render(
      path.join(
        __dirname,
        "..",
        "views",
        "account",
        "account",
      ),
      { type }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
})

router.get("/details", (req, res, next) => {
  try {
    const type = req.type;
    res.render(
      path.join(
        __dirname,
        "..",
        "views",
        "account",
        "accountDetails",
        "accountDetails"
      ),
      { type }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/orders", (req, res, next) => {
  try {
    const type = req.type;
    res.render(
      path.join(
        __dirname,
        "..",
        "views",
        "account",
        "accountOrders",
        "accountOrders"
      ), { type }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/products", (req, res, next) => {
  try {
    const type = req.type;
    if (!["supplier", "admin"].includes(type)) {
      res.status(404).send("unauthorized")
    }
    res.render(
      path.join(
        __dirname,
        "..",
        "views",
        "account",
        "accountProducts",
        "accountProducts"
      ), { type }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/orders/:orderId", (req, res, next) => {
  try {
    const type = req.type;
    const { orderId } = req.params;
    console.log(orderId);
    res.render(
      path.join(
        __dirname,
        "..",
        "views",
        "account",
        "accountViewOrder",
        "accountViewOrder"
      ), { type }
    );
  } catch (error) {

  }
});

router.get("/whishlist", (req, res, next) => {
  try {
    const type = req.type;
    if ("customer" !== type) {
      res.status(404).send("unauthorize");
    }
    res.render(
      path.join(
        __dirname,
        "..",
        "views",
        "account",
        "accountWishlist",
        "accountWishlist"
      )
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
});
module.exports = router;
