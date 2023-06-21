const ajax = require('ajax');
require('dotenv').config()

const validateEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// const validateCountry = async function (country) {
//     try {
//         const response = await ajax.get('https://restcountries.com/v3.1/name/isra?fullText=true');
//         const { data } = response
//         return data.status === 200;
//     } catch (error) {
//         return false;
//     }
// };

const addressValidator = async function (country, city, street, houseNumber) {
    let isAddressValid = false;
    try {
        const apiKey = process.env.GEOAPIFY_API_KEY;
        const url = 'https://api.geoapify.com/v1/geocode/search'
        const params = {
            text: `${houseNumber} ${street} ${city}, ${country}`,
            format: 'json',
            apiKey: apiKey,
        }
        const response = await ajax.get(url, params);
        const data = response.data;
        const results = data.results;
        isAddressValid = results.find(res => console.log(res.rank.match_type) || res.rank.match_type === 'full_match');
    } catch (error) {
        console.log(error.message);
    }
    return isAddressValid
}

module.exports = {
    validateEmail,
    addressValidator
}