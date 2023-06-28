const signupRouter = require('./signup.routes');
const loginRouter = require('./login.routes');
const accountRouter = require('./account.routes');
const checkoutRouter = require('./checkout.routes');
const productRouter = require("./products.routes");

module.exports = {
    signupRouter,
    loginRouter,
    accountRouter,
    checkoutRouter,
    productRouter,
  
}
