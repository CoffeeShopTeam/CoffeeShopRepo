const express = require("express");
const mongoConnect = require("./config/mongoConnect.js");
const session = require("express-session");
const routes = require("./routes");
const productsRoutes = require("./routes/products.routes");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT;
const SECRETE = process.env.SECRETE;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: SECRETE,
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/createProduct", productsRoutes);

app.listen(PORT, () => {
  console.log(`app available on http://localhost:${PORT}`);
  mongoConnect();
});
