const User = require("../../models/users/user.schema");

const getAllUsers = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = getAllUsers;
