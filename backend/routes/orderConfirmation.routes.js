const express = require("express");
const router = express.Router();
const path = require("path");
const Orders = require("../models/orders/orders.schema");

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
        res.render(path.join(
            __dirname, "..", "views", "orderConfirmation", "orderConfirmation"
        ), { order });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;