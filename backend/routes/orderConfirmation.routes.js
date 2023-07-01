const express = require("express");
const router = express.Router();
const path = require("path");
const Orders = require("../models/orders/orders.schema");
const { getProductById } = require('../controller/products/products.controller');
router.use('/', (req, res, next) => {
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
});

router.get('/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params;
        // TODO: Get and send to ejs order data
        const order = await Orders.findById(orderId)
            .populate("user")
            .populate("products.product").exec();
        console.log(order);
        let productsArray = []
        for (let index = 0; index < order.products.length; index++) 
        {
            productsArray[index] = await getProductById(order.products[index].product);
            productsArray[index].productQuantity = order.products[index].quantity;
        }
        res.render(path.join(
            __dirname, "..", "views", "orderConfirmation", "orderConfirmation"
        ), { order, productsArray });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;