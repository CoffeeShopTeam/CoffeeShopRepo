const User = require("../../models/users/user.schema");

async function getAllUsersCountry() {
  try {
    const users = await User.find({}, { country: 1 });
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = getAllUsersCountry;
