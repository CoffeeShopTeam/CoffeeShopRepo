require('dotenv').config({ path: '../../.env' });
const axios = require('axios');


const app_id = process.env.EXCHANGE_RATE_API_KEY;
const baseCurrency = 'USD';
const targetCurrency = 'EUR';
const amountToConvert = 100;

async function getExchangeRates() {
  try {
    const url = `https://restcountries.com/v2/currency/${targetCurrency}`;
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error(`Failed to fetch currency data. Status: ${response.status}`);
    }

    const data = response.data;
    if (data.length === 0) {
      throw new Error(`Currency not found.`);
    }

    const currencySymbol = data[0].currencies[0].symbol;
    console.log('Currency Symbol:', currencySymbol);

    const exchangeRateUrl = `https://v6.exchangerate-api.com/v6/${app_id}/latest/${baseCurrency}`;
    const exchangeRateResponse = await axios.get(exchangeRateUrl);

    if (exchangeRateResponse.status !== 200) {
      throw new Error(`Failed to fetch exchange rate data. Status: ${exchangeRateResponse.status}`);
    }

    const exchangeRateData = exchangeRateResponse.data;
    const rates = exchangeRateData.conversion_rates;
    const exchangeRate = rates[targetCurrency];
    const exchangedAmount = exchangeRate * amountToConvert;
    console.log(`Translating ${amountToConvert} ${baseCurrency} to ${targetCurrency} is ${exchangedAmount} ${currencySymbol}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getExchangeRates();

module.exports = getExchangeRates;
