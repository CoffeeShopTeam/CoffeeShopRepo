const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { validateEmail, addressValidator } = require('./user.validator');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        minlength: 2
    },
    lastName: {
        type: String,
        require: true,
        minlength: 2
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate: [validateEmail, 'Invalid email address']
    },
    password: {
        type: String,
        require: true,
    },
    rePassword: {
        type: String,
    },
    phone: {
        type: String,
        require: true,
        validate: [phoneNumberValidation, "Invalid phone Number"],
        minlength: 10
    },
    birthday: {
        type: Date,
        require: true
    },
    country: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    street: {
        type: String,
        require: true,
    },
    houseNumber: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true,
        enum: ['admin', 'supplier', 'customer'],
        default: 'customer'
    }
});

UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        console.log(this.password, this.rePassword);
        if (this.password !== this.rePassword) {
            throw new Error("Passwords does not match");
        }
        const isvalidAddress = await addressValidator(this.country, this.city, this.street, this.houseNumber)
        if (!isvalidAddress) {
            throw new Error("Address does not exist");
        }
        this.rePassword = "";
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;

        return next();
    } catch (error) {
        return next(error);
    }
});

const Users = mongoose.model('users', UserSchema);

module.exports = Users;