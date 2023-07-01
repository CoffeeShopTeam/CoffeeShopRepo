const User = require("../../models/users/user.schema");

const EditUserById = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      res.status(404).send("Cannot find product with this id");
      return;
    }

    user.type = req.body.userType;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

module.exports = EditUserById;
