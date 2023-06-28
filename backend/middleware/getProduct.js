const Products = require("../models/products/product.schema");

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    req.product = product;
    next();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = getProduct;
