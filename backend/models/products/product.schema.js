const mongoose = require("mongoose");
const validateQuantity = require("./product.validator");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    min: [2, "Name can't be shorter than 2 characters"],
  },
  productPrice: {
    type: Number,
    required: true,
    min: [1, "The minimum price is 1 dollar."],
  },
  productDescription: {
    type: String,
    required: true,
    min: [4, "Description can't be shorter than 4 characters"],
  },
  productCategory: {
    type: String,
    enum: ["machines", "capsules", "beans", "accessories"],
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
    min: [0, "The minimal quantity is zero."],
    validate: [validateQuantity, "Invalid quantity"],
  },
  supplierId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
  },
  productBrand: {
    type: String,
    required: true,
  },
});

const Products = mongoose.model("products", ProductSchema);
module.exports = Products;
