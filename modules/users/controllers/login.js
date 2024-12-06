const mongoose = require("mongoose");

const login = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email, password } = req;

  const getUser = await userModel.findOne({
    email: email,
  });

  if (!getUser) throw "This email does not exist";

  res.status(200).json({
    status: "Success",
    message: "User logged in successfully",
  });
};

module.exports = login;
