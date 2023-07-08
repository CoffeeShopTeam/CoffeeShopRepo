const express = require('express');
const router = express.Router();
const path = require("path");
const {createOrder, getAllOrders}  = require('../controller/index');
const { requireLogin } = require('../middleware');


router.use(requireLogin);

router.post('/', async(req, res, next) => {
    try{
        const orderDetails = req.body;
        const userId = req.session?.data._id;
        if(!userId)
            res.render(path.join(__dirname, "..", "views", "login", "loginPage",))
        else{
            let order = await createOrder(orderDetails, userId);
            console.log(order);
            res.status(201).send(order);
        }
    } catch(error){
        console.log(`message : ${error.message}`);
        res.status(500).send({message : error.message});
    }
});

router.get('/all', getAllOrders);

module.exports = router;