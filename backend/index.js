const express = require("express");
const mongoConnect = require("./config/mongoConnect.js");
const session = require("express-session");
const path = require("path");
const routes = require("./routes");
const bodyParser = require("body-parser");
const app = express();
<<<<<<< HEAD
require("dotenv").config();

const PORT = process.env.PORT;
const SECRETE = process.env.SECRETE;
=======
require('dotenv').config();
>>>>>>> 7a6fa7868ae4a05525e53b3bbe5d59e3c6db3b0a

const PORT = process.env.PORT;
const SECRET = process.env.SECRET

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views'),));
app.use(express.json());
app.use(express.urlencoded());
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
  }));
app.use("/ShopPage", routes.shopRouter);
app.use('/signup', routes.signupRouter);
app.use('/login', routes.loginRouter);
app.use('/account', routes.accountRouter);
app.use('/checkout', routes.checkoutRouter);
app.use("/createProduct", routes.productRouter);
app.get("/", (req, res, next) => {
  const filePath = path.join(__dirname, "views", "homePage", "homePage.ejs");
  res.render(filePath);
});

<<<<<<< HEAD
app.use("/signup", routes.signupRouter);
app.use("/login", routes.loginRouter);
app.use("/account", routes.accountRouter);
app.use("/cart", routes.cartRouter);

=======
>>>>>>> 7a6fa7868ae4a05525e53b3bbe5d59e3c6db3b0a
app.listen(PORT, () => {
  console.log(`app available on http://localhost:${PORT}`);
  mongoConnect();
});
