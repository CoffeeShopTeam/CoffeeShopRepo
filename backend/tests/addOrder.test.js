require("dotenv").config({ path: "../.env" });
const mongoConnect = require("../config/mongoConnect.js");

runTest();

async function runTest() {
  const connection = await mongoConnect();
  const Orders = require("../models/orders/orders.schema");
  const env = process.env.DATABASE_URL;
  console.log(`the env is ${env}`);
  const dateStr = "25/06/2023";
  const [day, month, year] = dateStr.split("/");
  const orderDate = new Date(`${month}/${day}/${year}`);

  const testOrder = await Orders({
    user: "649763d15fb623c04a94f045", // Replace with the actual user ID from mongo
    shippingDetails: {
      deliveryType: "Express Shipping",
      deliveryPrice: 30,
      email: "test12@example.com",
      phone: "1234562890",
      prefix: "Mr",
      country: "Country",
      city: "City",
      street: "Country",
      postalCode: "12345",
      ordersNotes: "Order notes",
    },
    paymentMethod: "credit card",
    cardNumber: "1234567890123456",
    orderDate: orderDate,
    couponCode: "roee",
  });
  try {
    const savedOrder = await testOrder.save();
    console.log("the data", savedOrder);
  } catch (error) {
    console.log(error.message);
  }
  return;
}
