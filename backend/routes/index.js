const signupRouter = require("./signup.routes");
const loginRouter = require("./login.routes");
const accountRouter = require("./account.routes2");
const checkoutRouter = require("./checkout.routes");
const productRouter = require("./products.routes");
const shopRouter = require("./shopPage.routes");
const orderConfirmationRouter = require("./orderConfirmation.routes");
const privacyPolicyRouter = require("./privacyPolicy.routes");
const ourStoryRouter = require("./ourStory.routes");
const ordersRouter = require("./orders.routes");
const productPageRouter = require("./productPage.routes");

module.exports = {
  signupRouter,
  loginRouter,
  accountRouter,
  checkoutRouter,
  productRouter,
  shopRouter,
  ordersRouter,
  orderConfirmationRouter,
  productPageRouter,
  privacyPolicyRouter,
  ourStoryRouter,
};
