const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  product: [
    {
      productName: {
        type: String,
        validate: function (String) {
          return length(String) > 0;
        },
        message: "Name must be a non-empty string",
      },

      productPrice: {
        type: Number,
        min: [1, "The minimum price is 1 dollar."],
      },
      productDescription: {
        type: String,
      },
      productCategory: {
        type: String,
        enum: ["machines", "capsules", "beans", "accessories"],
      },
      productImage: {
        type: String,
      },
    },
  ],
});

const Products = mongoose.model("products", ProductSchema);
module.exports = Products;
