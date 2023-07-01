const User = require("../../models/users/user.schema");

const deleteUser = async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });
    if (!result.deletedCount) {
      res.status(404).send("No user found with this id");
    } else {
      res.status(200).send("user deleted successfully");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

module.exports = deleteUser;
