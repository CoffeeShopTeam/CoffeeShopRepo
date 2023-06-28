const express = require("express");
const router = express.Router();
const path = require("path");

router.use("/", (req, res, next) => {
  const { type } = req.session.data;
  req.type = type;
  console.log(type);
  next();
});

router.get("/", (req, res, next) => {
  res.redirect("/account/details/");
});

router.get("/details", (req, res, next) => {
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
});

router.get("/orders", (req, res, next) => {
  const type = req.type;
  res.render(
    path.join(
      __dirname,
      "..",
      "views",
      "account",
      "accountOrders",
      "accountOrders"
    )
  );
});

router.get("/products", (req, res, next) => {
  const type = req.type;
  res.render(
    path.join(
      __dirname,
      "..",
      "views",
      "account",
      "accountProducts",
      "accountProducts"
    )
  );
});

router.get("/orders/:orderId", (req, res, next) => {
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
    )
  );
});

router.get("/whishlist", (req, res, next) => {
  const type = req.type;
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
});
module.exports = router;
