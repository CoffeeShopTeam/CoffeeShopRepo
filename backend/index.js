const express = require("express");
const mongoConnect = require("./config/mongoConnect.js");
const session = require("express-session");
const path = require("path");
const routes = require("./routes");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
require("dotenv").config();

const PORT = process.env.PORT;
const SECRETE = process.env.SECRETE;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));
app.use(express.json());
app.use(express.urlencoded());
app.use(
  session({
    secret: SECRETE,
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res, next) => {
  const filePath = path.join(__dirname, "views", "homePage", "homePage.ejs");
  res.render(filePath);
});

app.use("/ShopPage", routes.shopRouter);
app.use("/signup", routes.signupRouter);
app.use("/login", routes.loginRouter);
app.use("/account", routes.accountRouter);
app.use("/createProduct", routes.productRouter);

app.listen(PORT, () => {
  console.log(`app available on http://localhost:${PORT}`);
  mongoConnect();
});
