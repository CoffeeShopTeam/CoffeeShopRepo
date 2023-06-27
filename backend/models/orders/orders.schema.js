const mongoose = require("mongoose");
const { validateEmail, addressValidator } = require("../users/user.validator");
const {
  validateCreditCard,
  validateDate,
  validateCoupon,
} = require("./order.validator");
const bcrypt = require("bcrypt");

const ordersSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User", // Reference the user schema
  },

  shippingDetails: {
    deliveryType: {
      type: String,
      require: true,
      enum: ["Express Shipping", "Regular Shipping"],
      default: "Regular Shipping",
    },
    deliveryPrice: {
      type: Number,
      require: true,
      enum: [30, 10],
      default: 30,
    },
    email: {
      type: String,
      require: true,
      validate: [validateEmail, "Invalid email address"],
    },
    phone: {
      type: String,
      require: true,
      minlength: 10,
    },
    prefix: {
      type: String,
      require: true,
      enum: ["Mr", "Ms", "Mrs", "Dr"],
      default: "Mr",
    },
    country: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
      min: [2, `city can't be shorter then two characters`],
    },
    street: {
      type: String,
      require: true,
      min: [2, `street can't be shorter then two characters`],
    },
    postalCode: {
      type: String,
      require: true,
      min: [5, `postal code can't be shorter then two characters`],
    },
    ordersNotes: {
      type: String,
      min: [4, `note can't be shorted then 4 characters`],
    },
  },

  paymentMethod: {
    type: String,
    require: true,
    enum: ["credit card", "cash on delivery", "pay on store"],
    default: "credit card",
  },

  cardNumber: {
    type: String,
    validate: [validateCreditCard, "invalid credit card number"], //TODO
  },

  orderDate: {
    type: Date,
    required: true,
    validate: [validateDate, "date must be valid and greater then past time"],
  },

  couponCode: {
    type: String,
    require: true,
    enum: ["Effi", "roee", "gil", "etai", "bar", "kfir"],
    validate: [validateCoupon, "Sorry, this coupon is invalid"],
  },
});

ordersSchema.pre("save", async function (next) {
  const { country, city, street, houseNumber } = this.shippingDetails;
  try {
    const isAddressValid = await addressValidator(
      country,
      city,
      street,
      houseNumber
    );
    if (!isAddressValid) {
      throw new Error("Address is not valid");
    }
  } catch (error) {
    return next(error);
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedCardNumber = await bcrypt.hash(this.cardNumber, salt);
    this.cardNumber = hashedCardNumber;

    return next();
  } catch (error) {
    return next(error);
  }
});

const Orders = mongoose.model("orders", ordersSchema);

module.exports = Orders;
