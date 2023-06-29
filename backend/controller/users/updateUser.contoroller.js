const User = require("../../models/users/user.schema");
const bcrypt = require("bcrypt");

async function updateUserFields(user, data) {
  user.firstName = data.firstName;
  user.lastName = data.lastName;
  user.email = data.email;
  user.phone = data.phone;
  user.country = data.country;
  user.city = data.city;
  user.street = data.street;
  user.houseNumber = data.houseNumber;
}

async function updateUserPassword(user, data) {
  console.log("changing password");
  user.password = data.newPassword;
  user.rePassword = data.newPassword;
}

module.exports = { updateUserFields, updateUserPassword };
