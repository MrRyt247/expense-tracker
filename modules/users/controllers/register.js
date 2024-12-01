const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  } = req;

  // validations
  if (!firstname) throw "Firstname must be provided!";
  if (!lastname) throw "Lastname must be provided!";
  if (!email) throw "email must be provided!";
  if (!password) throw "Password must be provided!";
  if (password < 8 && password > 20)
    throw "Password must be between 8 and 20 characters long!";
  if (password !== confirmPassword)
    throw "Password and confirmed password does not match!";

  const duplicateEmail = await usersModel.findOne({
    email: email,
  });
  if (duplicateEmail) throw "Email already exists!";

  await usersModel.create({
    firstname: firstname,
    middlename: middlename,
    lastname: lastname,
    email: email,
    password: await bcrypt.hash(password, 12),
    balance: balance,
  });
  res.status(201).json({
    status: "User creates successfully"
  })
};

module.exports = register;
