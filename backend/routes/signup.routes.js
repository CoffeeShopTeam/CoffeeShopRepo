const express = require('express');
const router = express.Router();
const path = require('path');
const { createUser } = require('../controller/users')

router.get('/', (req, res, next) => {
    res.render(path.join(__dirname, '../', 'views', 'signup', 'signUpPage'));
});

router.post('/', async (req, res, next) => {
    console.log('here!')
    try {
        const userDetails = req.body;
        console.log(userDetails);
        await createUser(userDetails);
        res.send("Saved!")
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});

module.exports = router;