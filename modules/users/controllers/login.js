const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email, password } = req.body;

  const user = await userModel.findOne({
    email: email,
  });

  if (!user) throw "This email does not exist";

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) throw "Password is incorrect!";

  const accessToken = await jwt.sign(
    { _id: user._id, lastname: user.lastname },
    process.env.JWT_KEY
  );

  res.status(200).json({
    status: "Success",
    message: "User logged in successfully",
  });
};

module.exports = login;
