const express = require('express');
const router = express.Router();
const path = require('path');
const { login } = require('../controller/users');

router.get('/', (req, res, next) => {
    res.render(path.join(__dirname, '../', 'views', 'login', 'loginPage'));
});

router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        const user = await login(data);
        if (!user) throw new Error("email of password are wrong");
        req.session.data = user
        res.status(200).send("Loged in!");
    } catch (error) {
        res.redirect('/login/');
    }
});

module.exports = router;