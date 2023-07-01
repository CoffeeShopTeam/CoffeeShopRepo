const express = require('express');
const router = express.Router();
const {createOrder, getAllOrders}  = require('../controller/index');

//render to order confirmation
router.post('/', async(req, res, next) => {
    try{
        const orderDetails = req.body;
        const userId = req.session?.data._id;
        if(!req.session?.data._id)
            res.redirect('/login');
        else{
            await createOrder(orderDetails, userId);
            res.status(201).send('order have been saved succesfully');
            }
    } catch(error){
        console.log(`message : ${error.message}`);
        res.status(500).send({message : error.message});
    }
});

router.get('/all', getAllOrders);

module.exports = router;