const express = require("express");
const mongoConnect = require("./config/mongoConnect.js");
const session = require("express-session");
const routes = require("./routes");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
require("dotenv").config();
const PORT = process.env.PORT;
const SECRETE = process.env.SECRETE;

app.set("view engine", "ejs");
app.use(express.static("./views"));
app.use(express.json());
app.use(
  session({
    secret: SECRETE,
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/signup", routes.signupRouter);
app.use("/login", routes.loginRouter);
app.use("/createProduct", routes.productRouter);

app.listen(PORT, () => {
  console.log(`app available on http://localhost:${PORT}`);
  mongoConnect();
});
