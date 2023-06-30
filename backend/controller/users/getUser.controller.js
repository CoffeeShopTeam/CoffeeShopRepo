const User = require("../../models/users/user.schema");

async function getUser(email) {
  const user = await User.findOne({ email });
  delete user.password;
  delete user.rePassword;
  return user;
}

module.exports = getUser;
