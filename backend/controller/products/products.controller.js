const Product = require("../models/products/product.schema");
require("dotenv").config();

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(producst);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(204).send("Product not found by id: " + req.params.id);
    }
    res.send(products);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const createProduct = async (req, res) => {
  const { name, price, description, category, image } = req.body;
  try {
    const product = new Product({ name, price, description, category, image });
    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};

const updateProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(204).send("Cannot find product with this id");
      return;
    }
    const { name, price, description, category, image } = req.body;

    if (name) {
      product.productName = name;
    }

    if (price) {
      product.productPrice = price;
    }

    if (description) {
      product.productDescription = description;
    }

    if (category) {
      product.productCategory = category;
    }

    if (image) {
      product.productImage = image;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    if (!result.deletedCount) {
      res.status(204).send("No product found with this id");
    } else {
      res.status(200).send("Product deleted successfully");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};
