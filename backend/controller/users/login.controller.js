const bcrypt = require("bcrypt");
const User = require("../../models/users/user.schema");

async function login({ email, password }) {
  if (!email || !password) throw new Error("Missing parameter");
  const user = await User.findOne({ email });
  if (!user) return null;
  const matchPasswords = await bcrypt.compare(password, user.password);
  if (!matchPasswords) return null;
  // const data = {
  //     firstName: user.firstName,
  //     type: user.type
  // }
  return user;
}

module.exports = login;
