const signupRouter = require("./signup.routes");
const loginRouter = require("./login.routes");
const accountRouter = require("./account.routes");
const checkoutRouter = require("./checkout.routes");
const productRouter = require("./products.routes");
const shopRouter = require("./shopPage.routes");
const orderConfirmationRouter = require("./orderConfirmation.routes");
const productPageRouter = require("./productPage.routes");
const cartRouter = require("./cart.routes");

module.exports = {
  signupRouter,
  loginRouter,
  accountRouter,
  checkoutRouter,
  productRouter,
  shopRouter,
  orderConfirmationRouter,
  cartRouter,
  productPageRouter,
};
