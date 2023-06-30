const Orders = require("../../models/orders/orders.schema");
const path = require('path');

async function createOrder(orderDetails, userId) {
    console.log(orderDetails);
    const parsedData = createUserObjec(orderDetails, userId);
    const newOrder = await Orders(parsedData);
    const savedOrder = await newOrder.save();
    if (!savedOrder) throw new Error("there was an error saving the order");
    return savedOrder;
};

const  getAllOrders = async(req, res) => {
    try {
        const allOrders =  await Orders.find();
        res.status(200).json(allOrders);
    } catch (error) {
        console.log(`Failed to get orders: ${error}`);
        res.status(500).json({ error: 'Failed to get orders' });
    }
};

const getOrdersByOrderId = async(req, res) => {
    try {
        const orderId = req.params.orderId;
        const orders = await Orders.find({ orderId: orderId });        
        res.status(200).json(orders);
    } catch (error) {
        console.log(`Failed to fetch orders: ${error}`);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
}

function createUserObjec(orderDetails, userId)
{
    const data = {
    user: userId,
    shippingDetails: {
        deliveryPrice: 10,
        email: orderDetails.email,
        phone: orderDetails.phone,
        prefix: orderDetails.prefix,
        country: orderDetails.country,
        city: orderDetails.city,
        street: orderDetails.street,
        postalCode: orderDetails.postalCode,
        ordersNotes: orderDetails.ordersNotes,
    },
    orderPrice: orderDetails.orderPrice,
    paymentMethod: "credit card",
    cardNumber: orderDetails.cardNumber,
    orderDate: new Date(),
};
    if (orderDetails.couponCode) {
            data.couponCode = orderDetails.couponCode;
        }
    return data;
}

module.exports = { createOrder, getAllOrders, getOrdersByOrderId };
