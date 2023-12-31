const express = require("express");
const mongoConnect = require("./config/mongoConnect.js");
const session = require("express-session");
const path = require("path");
const routes = require("./routes");
const bodyParser = require("body-parser");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));
app.use(express.json());
app.use(express.urlencoded());
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/ShopPage", routes.shopRouter);
app.use("/signup", routes.signupRouter);
app.use("/login", routes.loginRouter);
app.use("/logout", routes.logoutRouter);
app.use("/account", routes.accountRouter);
app.use("/checkout", routes.checkoutRouter);
app.use("/createProduct", routes.productRouter);
app.use("/graph", routes.graphRouter);
app.use("/product", routes.productRouter);
app.use("/orders", routes.ordersRouter);
app.use("/orderConfirmation", routes.orderConfirmationRouter);
app.use("/privacyPolicy", routes.privacyPolicyRouter);
app.use("/ourStory", routes.ourStoryRouter);
app.use("/ProductPage", routes.productPageRouter);
app.use("/cart", routes.cartRouter);
app.use("/", routes.homePageRouter);
app.use("/contactUs", routes.contactUsRouter);

app.listen(PORT, () => {
  console.log(`app available on http://localhost:${PORT}`);
  mongoConnect();
});
