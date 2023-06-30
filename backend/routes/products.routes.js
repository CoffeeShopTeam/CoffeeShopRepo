const express = require("express");
const router = express.Router();
const path = require("path");
const {
  createProduct,
  getAllProducts,
  getProductById,
  EditProductById,
  deleteProduct,
} = require("../controller/products/products.controller");

router.use("/", (req, res, next) => {
  try {
    const data = req?.session?.data;
    if (!data) {
      res.redirect('/login/');
    } else {
      next();
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
})

router.get("/", (req, res, next) => {
  res.render(path.join(__dirname, "../", "views", "products", "createProduct"));
});

router.post("/", async (req, res, next) => {
  try {
    await createProduct(req, res);
    res.redirect('/account/products/')
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

router.get("/", getAllProducts);

router.get("/:id", async (req, res, next) => {
  const productId = req.params.id;
  const product = await getProductById(productId);
  res.json(product);
});

router.put("/:id", EditProductById);

router.delete("/:id", async (req, res) => {
  try {
    await deleteProduct(req, res);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

module.exports = router;
