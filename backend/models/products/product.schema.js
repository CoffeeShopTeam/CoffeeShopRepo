const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    validator: function (name) {
      return name.length > 0;
    },
    message: "Name must be a non-empty string",
    required: true,
  },

  productPrice: {
    type: Number,
    min: [1, "The minimum price is 1 dollar."],
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
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
});

const Products = mongoose.model("products", ProductSchema);
module.exports = Products;
