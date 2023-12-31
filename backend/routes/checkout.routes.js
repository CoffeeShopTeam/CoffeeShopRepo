const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const { exchangeRate } = require('../services/index');
const { requireLogin } = require('../middleware');

router.use(requireLogin);

router.get('/', async (req, res, next) => {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryArray = response.data.map((country) => country.name.common);
        countryArray.sort();
        const israelIndex = countryArray.indexOf("Israel");
    if (israelIndex !== -1) {
            countryArray.splice(israelIndex, 1);
            countryArray.unshift("Israel");
    }

    res.render(path.join(__dirname, '..', 'views', 'checkout', 'Checkout.ejs'), {
        countries: countryArray,
    });
    } catch (error) {
    console.log(`Failed to fetch country data: ${error}`);
    }
});

router.get('/exchange/', async (req, res, next) => {
    try {
        const { baseCurrency, targetCurrency, amount } = req.query;
        const exchangeRateResult = await exchangeRate(targetCurrency , baseCurrency , amount);
        const {convertedAmount, currencySymbol, current} = exchangeRateResult;
        console.log(`the returned amount will be ${convertedAmount} ${currencySymbol}`);
        res.json({convertedAmount , currencySymbol, current});
        } catch (error) {
            console.log(`Error performing currency conversion: ${error}`);
    }
});

module.exports = router;
