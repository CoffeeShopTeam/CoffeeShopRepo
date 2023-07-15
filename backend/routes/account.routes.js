const express = require("express");
const router = express.Router();
const path = require("path");
const Orders = require("../models/orders/orders.schema");
const { addressValidator } = require("../models/users/user.validator.js");
const { getProductByOrderId  } = require('../controller/products/products.controller');
const { getOrderWithPopulatedData} = require('../controller/orders/orders.controller')
const getUser = require(path.join(__dirname, "../", "controller", "users", "getUser.controller"));
const { updateUserFields, updateUserPassword } = require("../controller/users/updateUser.contoroller.js");
const { getAllProducts, getAllSupplierProducts } = require("../controller/products/products.controller.js");
const { getOrdersByOrderId ,editOrderById } = require('../controller/index')
const deleteUser = require(path.join(__dirname, "../", "controller", "users", "deleteUser.controller"));
const EditUserById = require(path.join(__dirname, "../", "controller", "users", "EditUserById.controller"));
const getAllUsers = require(path.join(__dirname, "../", "controller", "users", "getAllUsers.controller"));

router.use("/", (req, res, next) => {
  try {
    const { type, _id } = req.session.data;
    req.type = type;
    req.userId = _id;
    next();
  } catch (error) {
    res.redirect("/login/");
  }
});

router.get("/", (req, res, next) => {
  res.redirect("/account/details/");
});

router.get("/navbar", (req, res, next) => {
  try {
    const type = req.type;
    res.render(path.join(__dirname, "..", "views", "account", "account"), {
      type,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/details", async (req, res, next) => {
  try {
    const type = req.type;
    const { email } = req.session.data;
    const user = await getUser(email);
    res.render(
      path.join(
        __dirname,
        "..",
        "views",
        "account",
        "accountDetails",
        "accountDetails"
      ),
      { user }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/details", async (req, res, next) => {
  try {
    const { email } = req.session.data;
    const user = await getUser(email);

    if (req.body.newPassword) {
      const matchPasswords = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!matchPasswords) {
        throw new Error("Passwords does not match");
      }
      await updateUserPassword(user, req.body);
    } else {
      const isvalidAddress = await addressValidator(
        req.body.country,
        req.body.city,
        req.body.street,
        req.body.houseNumber
      );
      if (!isvalidAddress) {
        throw new Error("Address does not exist");
      }
      await updateUserFields(user, req.body);
    }
    await user.save();
    res.send("success");
  } catch (error) {
    console.log(error.message);

    if (error.message === "Address does not exist") {
      console.log(error.message);
      res.status(400).json({ error: error.message });
    } else if (error.message === "Passwords does not match") {
      console.log(error.message);
      res.status(400).json({ error: error.message });
    } else {
      res.redirect("/login/");
    }
  }
});

router.get("/orders", async(req, res, next) => {
  try {
    let userOrders
    const type = req.type;
    const userId = req.session?.data._id;
    if(type === "customer")
        userOrders = await Orders.find({user : userId})
    else if(type === "admin" )
        userOrders = await Orders.find()
    else
        userOrders = [];      
    res.render(
      path.join(
        __dirname,
        "..",
        "views",
        "account",
        "accountOrders",
        "accountOrders"
      ), { type, orders: userOrders });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/orders/:orderId" ,async(req, res, next) => {
  try {
    await getOrdersByOrderId(req,res)
  } catch (error) {
    console.log(error.message);
  }
});

router.put('/orders/:orderId', async(req,res) => {
  try {
    await editOrderById(req, res);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
})

router.get("/products", async (req, res, next) => {
  try {
    const type = req.type;
    let products = [];
    if (!["supplier", "admin"].includes(type)) {
      res.redirect("/account/");
    }
    if (type === "admin") {
      products = await getAllProducts();
    }
    if (type === "supplier") {
      products = await getAllSupplierProducts(req.userId);
    }


    res.render(
      path.join(
        __dirname,
        "..",
        "views",
        "account",
        "accountProducts",
        "accountProducts"
      ),
      { type, products }
    );

  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/orders/:orderId", async(req, res, next) => {
  try {
    const type = req.type;
    const { orderId } = req.params;
    const order = await getOrderWithPopulatedData(orderId);
    let productsArray = await getProductByOrderId(order);
    res.render(
      path.join(
        __dirname,
        "..",
        "views",
        "account",
        "accountViewOrder",
        "accountViewOrder"
      ),
      { type,order, productsArray  }
    );

  } catch (error) {
        throw new Error('order was not found')
  }
});


router.get("/whishlist", (req, res, next) => {
  try {
    const type = req.type;
    if ("customer" !== type) {
      res.status(404).send("unauthorize");
    }
    res.render(
      path.join(
        __dirname,
        "..",
        "views",
        "account",
        "accountWishlist",
        "accountWishlist"
      )
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/users", async (req, res, next) => {
  try {
    const type = req.type;
    let users = [];
    if (!["admin"].includes(type)) {
      res.redirect("/account/");
    }
    users = await getAllUsers();
    res.render(path.join(__dirname, "..", "views", "account", "accountUsers", "accountUsers"), { type, users });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.get("/dashboard", (req, res, next) => {
  try {
    const type = req.type;
    if (!["admin"].includes(type)) {
      res.status(404).send("unauthorized");
    }
    res.render(path.join(__dirname, "..", "views", "account", "accountDashboard", "accountDashboard"));
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await deleteUser(req, res);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    console.log(req.body);
    EditUserById(req, res);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

module.exports = router;
