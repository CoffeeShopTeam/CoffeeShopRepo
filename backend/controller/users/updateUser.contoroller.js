const User = require("../../models/users/user.schema");

async function updateUserFields(user, data) {
  user.firstName = data.firstName;
  user.lastName = data.lastName;
  user.email = data.email;
  user.phone = data.phone;
  user.country = data.country;
  user.city = data.city;
  user.street = data.street;
  user.houseNumber = data.houseNumber;
  await user.save();
}

async function updateUserPassword(user, data) {
  user.firstName = data.firstName;
  user.lastName = data.lastName;
  user.email = data.email;
  user.phone = data.phone;
  user.country = data.country;
  user.city = data.city;
  user.street = data.street;
  user.houseNumber = data.houseNumber;
  return user;
}

module.exports = { updateUserFields, updateUserPassword };
