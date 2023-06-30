const path = require("path");
const Product = require(path.join(
  __dirname,
  "../",
  "../",
  "models",
  "products",
  "product.schema"
));
const bcrypt = require("bcrypt");
const twitterClient = require(path.join(
  __dirname,
  "../",
  "../",
  "services",
  "twitterAPI",
  "twitterClient"
));
require("dotenv").config();

const getAllProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

async function getProductById(productId) {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const getProductsByCategory = async (category, limit, excludeProductId) => {
  try {
    const products = await Product.find({
      productCategory: category,
      _id: { $ne: excludeProductId },
    })
      .limit(limit)
      .exec();
    return products;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createProduct = async (req, res) => {
  const {
    productName,
    productPrice,
    productDescription,
    productCategory,
    productImage,
    productQuantity,
    supplierId,
    productBrand,
  } = req.body;
  try {
    console.log(req.body);
    const product = new Product({
      ...req.body,
    });
    await product.save();
    res.status(200).json({ success: true, data: product });
    const productId = product._id;
    const tweetMessage = `We got a brand new product: ${productName}!\n\nFind it Here: http://Urusta.co.il/${productId}`;
    const tweet = await twitterClient.v2.tweet(tweetMessage);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};

const EditProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).send("Cannot find product with this id");
      return;
    }

    Object.assign(product, req.body);

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
      res.status(404).send("No product found with this id");
    } else {
      res.status(200).send("Product deleted successfully");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  EditProductById,
  deleteProduct,
};
