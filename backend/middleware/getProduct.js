const Products = require("../models/products/product.schema");

const getProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(404).json({ error: "Invalid product ID" });
    }

    const product = await Products.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    req.product = product;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getProduct;
