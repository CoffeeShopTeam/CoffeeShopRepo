const express = require("express");
const router = express.Router();
const path = require("path");
const Orders = require("../models/orders/orders.schema");
const { getProductByOrderId  } = require('../controller/products/products.controller');
const { getOrderWithPopulatedData} = require('../controller/orders/orders.controller')
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
        const order = await getOrderWithPopulatedData(orderId);
        let productsArray = await getProductByOrderId(order);
        res.render(path.join(
            __dirname, "..", "views", "orderConfirmation", "orderConfirmation"
        ), { order, productsArray });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
