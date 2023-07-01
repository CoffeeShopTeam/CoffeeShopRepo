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
  products:[{
  product:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "products",
    },
    quantity:{
      type:Number,
      require: true,
      min: [1, 'quantity must be a positive number']
    }
    }] ,

  shippingDetails: {
    deliveryPrice: {
      type: Number,
      require: true,
      enum: [10],
      default: 10,
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
  orderPrice: {
    type: String,
    require: true,
    min: [1, "the price must be a positive number"]
  },
  paymentMethod: {
    type: String,
    require: true,
    enum: ["credit card", "cash on delivery", "pay on store"],
    default: "credit card",
  },

  cardNumber: {
    type: String,
  },

  orderDate: {
    type: Date,
    required: true,
    validate: [validateDate, "date must be valid and greater then past time"],
  },

  couponCode: {
    type: String,
    require: true,
    enum: ["Effi", "roee", "gil", "itay", "bar", "kfir"],
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
  if (!this.isModified("cardNumber")) {
    return next();
  }
  try {
    if(validateCreditCard(this.cardNumber))
    {
      const salt = await bcrypt.genSalt(10);
      const hashedCardNumber = await bcrypt.hash(this.cardNumber, salt);
      this.cardNumber = hashedCardNumber;
      return next();
    }
    else
      return next();
  } catch (error) {
    return next(error);
  }
});

const Orders = mongoose.model("orders", ordersSchema);

module.exports = Orders;
