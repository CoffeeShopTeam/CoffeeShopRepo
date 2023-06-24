const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/products/product.schema");

require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));

// Connect to the MongoDB database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");

    // Start the server
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

// Handle the form submission and save the product to the database
app.post("/create-product", async (req, res) => {
  const {
    productName,
    productPrice,
    productDescription,
    productCategory,
    productImage,
  } = req.body;

  try {
    const product = new Product({
      productName,
      productPrice,
      productDescription,
      productCategory,
      productImage,
    });

    const savedProduct = await product.save();

    res.status(201).json({ success: true, data: savedProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({ success: false, message: "Product creation failed" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/AddProduct.html");
});

connectToDatabase();
