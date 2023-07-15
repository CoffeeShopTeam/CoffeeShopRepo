const {createOrder, getAllOrders , getOrdersByOrderId, editOrderById} = require('./orders/orders.controller');

module.exports = {
    createOrder,
    getAllOrders,
    getOrdersByOrderId,
    editOrderById
};