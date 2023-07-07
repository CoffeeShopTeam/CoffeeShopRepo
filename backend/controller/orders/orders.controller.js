const Orders = require("../../models/orders/orders.schema");
const { getProductById } = require("../products/products.controller");

async function createOrder(orderDetails, userId) {
    try {
        console.log(orderDetails);
        const parsedData = createUserObject(orderDetails, userId);
        parsedData.products.forEach(async (product) => {
            const fullProduct = await getProductById(product.product);
            if (!fullProduct) throw new Error(`Could not find product ${product.product}`);
            const newQuantity = fullProduct.productQuantity - product.quantity;
            if (newQuantity < 0) throw new Error("Quantity is greater then the maximum");
            fullProduct.set("productQuantity", newQuantity);
            fullProduct.save();
        });
        const newOrder = await Orders(parsedData);
        const savedOrder = await newOrder.save();
        if (!savedOrder) throw new Error("there was an error saving the order");
        return savedOrder;
    } catch (error) {
        console.log(error.message);
    }
};

const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Orders.find();
        res.status(200).json(allOrders);
    } catch (error) {
        console.log(`Failed to get orders: ${error}`);
        res.status(500).json({ error: 'Failed to get orders' });
    }
};

const getOrdersByOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;
        const orders = await Orders.find({ _id: orderId });
        if (orders)
            console.log('the order was saved succesfully');
        else
            res.status(404).send("Order not found");
    } catch (error) {
        console.log(`Failed to fetch orders: ${error}`);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
}


const editOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Orders.findById({ _id: orderId });
        if (!order) {
            res.status(404).send("Cannot find product with this id");
            return;
        }
        const { email } = req.body;
        order.shippingDetails.email = email;
        const updatedEmail = await order.save();
        res.json(updatedEmail);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e.message });
    }
};

function createUserObject(orderDetails, userId) {
    let products = []
    const reqProducts = JSON.parse(orderDetails.products);
    for (let index = 0; index < reqProducts.length; index++) {
        products.push({
            product: reqProducts[index].id,
            quantity: reqProducts[index].quantity
        })
    }
    const data = {
        user: userId,
        products: products,
        shippingDetails: {
            deliveryPrice: 10,
            email: orderDetails.email,
            phone: orderDetails.phone,
            prefix: orderDetails.prefix,
            country: orderDetails.country,
            city: orderDetails.city,
            street: orderDetails.streetAddress,
            houseNumber: orderDetails.houseNumber,
            postalCode: orderDetails.postlCode,
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

module.exports = { createOrder, getAllOrders, getOrdersByOrderId, editOrderById };
