const { default: axios } = require('axios');
require('dotenv').config()

const validateEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

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
        const response = await axios.get(url, { params });
        if (!response) throw new Error("Cannot validate address");
        const data = await response.data;
        if (!data) throw new Error("Cannot validate address - no data")
        const results = data.results;
        if (!results) throw new Error("Cannot validate address - no results")
        isAddressValid = results.find(res => (
            res.rank.match_type === 'full_match' ||
            res.rank.confidence >= 0.9
        ));
    } catch (error) {
        console.log(error.message);
    }
    return isAddressValid
}

module.exports = {
    validateEmail,
    addressValidator
}