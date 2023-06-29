const express = require("express");
const router = express.Router();
const path = require("path");

router.use('/', (req, res, next) => {
    try {
        const data = req?.session?.data;
        console.log(data);
        if (!data) {
            res.redirect('/login/');
        } else {
            next();
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/:orderId', (req, res, next) => {
    try {
        const { orderId } = req.params;
        // TODO: Get and send to ejs order data
        res.render(path.join(
            __dirname, "..", "views", "orderConfirmation", "orderConfirmation"
            ), { orderId })
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;