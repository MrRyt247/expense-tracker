const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtManager = require("../../../managers/jwtManager");

const login = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email, password } = req.body;

  const user = await userModel.findOne({
    email: email,
  });

  if (!user) throw "This email does not exist";

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) throw "Password is incorrect!";

  const accessToken = jwtManager(user);

  res.status(200).json({
    status: "Success",
    message: "User logged in successfully",
    accessToken: accessToken,
  });
};

module.exports = login;
