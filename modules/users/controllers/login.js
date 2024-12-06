const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email, password } = req;

  const getUser = await userModel.findOne({
    email: email,
  });

  if (!getUser) throw "This email does not exist";

  const comparePassword = await bcrypt.compare(password, getUser.password);
  if (!comparePassword) throw "Password is incorrect!";

  const accessToken = await jwt.sign(
    { _id: getUser._id, name: getUser.name },
    process.env.JWT_KEY
  );

  res.status(200).json({
    status: "Success",
    message: "User logged in successfully",
  });
};

module.exports = login;
