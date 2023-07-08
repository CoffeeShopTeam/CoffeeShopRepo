const signupRouter = require("./signup.routes");
const loginRouter = require("./login.routes");
const accountRouter = require("./account.routes");
const checkoutRouter = require("./checkout.routes");
const productRouter = require("./products.routes");
const shopRouter = require("./shopPage.routes");
const orderConfirmationRouter = require("./orderConfirmation.routes");
const graphRouter = require("./graphs.routes");
const privacyPolicyRouter = require("./privacyPolicy.routes");
const ourStoryRouter = require("./ourStory.routes");
const ordersRouter = require("./orders.routes");
const productPageRouter = require("./productPage.routes");
const cartRouter = require("./cart.routes");
const logoutRouter = require("./logout.routes");
const homePageRouter = require("./homePage.routes");
const contactUsRouter = require("./contactUs.routes");

module.exports = {
  signupRouter,
  loginRouter,
  accountRouter,
  checkoutRouter,
  productRouter,
  shopRouter,
  graphRouter,
  orderConfirmationRouter,

  ordersRouter,

  cartRouter,

  productPageRouter,
  privacyPolicyRouter,
  ourStoryRouter,
  logoutRouter,
  homePageRouter,
  contactUsRouter,
};
