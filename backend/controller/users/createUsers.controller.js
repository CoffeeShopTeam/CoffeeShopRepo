const User = require("../../models/users/user.schema");

async function createUsers(userDetails) {
  const newUser = await User(userDetails);
  const savedUser = await newUser.save();
  if (!savedUser) throw new Error("Something went wrong. Could not save this user");
  return savedUser;
}

module.exports = createUsers;
