async function main() {
  require("dotenv").config();
  const mongoConnect = require("../config/mongoConnect");
  const connection = await mongoConnect();
  console.log(connection);
  const User = require("../models/users/user.schema");
  const user = await User({
    firstName: "Gil",
    lastName: "Heller",
    password: "1234",
    rePassword: "1234",
    email: "abc@ads.com",
    phone: "1234567890",
    country: "Israel",
    city: "Rishon LeZion",
    street: "Elie Wiesel",
    houseNumber: "2",
    type: "admin",
  });
  const savedUser = await user.save();
  console.log(savedUser);
  return;
}

main();
