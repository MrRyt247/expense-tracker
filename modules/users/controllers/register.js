const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");

const register = async (req, res) => {
  const usersModel = mongoose.model("users");

  const {
    firstname,
    middlename,
    lastname,
    email,
    password,
    confirmPassword,
    balance,
  } = req.body;

  // validations
  if (!firstname) throw "First name must be provided!";
  if (!lastname) throw "Last name must be provided!";
  if (!email) throw "Email must be provided!";
  if (!password) throw "Password must be provided!";
  if (password < 8 && password > 20)
    throw "Password must be between 8 and 20 characters long!";
  if (password !== confirmPassword)
    throw "Password and confirmed password does not match!";

  const duplicateEmail = await usersModel.findOne({
    email: email,
  });

  if (duplicateEmail) throw "Email already exists!";

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await usersModel.create({
    firstname: firstname,
    middlename: middlename,
    lastname: lastname,
    email: email,
    password: hashedPassword,
    balance: balance,
  });

  const accessToken = jwtManager(user);

  res.status(201).json({
    status: "User created successfully",
    accessToken: accessToken,
  });
};

module.exports = register;
