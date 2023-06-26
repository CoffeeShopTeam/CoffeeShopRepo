const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) => {
    res.redirect('/account/details/')
});

router.get('/details', (req, res, next) => {
    res.render(path.join(__dirname, '..', 'views', 'account', 'accountDetails', 'accountDetails'));
});

router.get('/orders', (req, res, next) => {
    res.render(path.join(__dirname, '..', 'views', 'account', 'accountOrders', 'accountOrders'));
});

router.get('/products', (req, res, next) => {
    res.render(path.join(__dirname, '..', 'views', 'account', 'accountProducts', 'accountProducts'));
});

router.get('/orders/:orderId', (req, res, next) => {
    const { orderId } = req.params;
    console.log(orderId);
    res.render(path.join(__dirname, '..', 'views', 'account', 'accountViewOrder', 'accountViewOrder'));
});

router.get('/whishlist', (req, res, next) => {
    res.render(path.join(__dirname, '..', 'views', 'account', 'accountWishlist', 'accountWishlist'));
});
module.exports = router;