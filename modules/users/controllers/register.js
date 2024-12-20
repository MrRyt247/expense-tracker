const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { name, email, password, confirmPassword, balance } = req.body;

  // validations
  if (!name) throw "Name must be provided!";
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
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
  });
  console.log(user);
  res.status(201).json({
    status: "User created successfully",
  });
};

module.exports = register;
