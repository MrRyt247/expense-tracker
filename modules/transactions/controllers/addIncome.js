const mongoose = require("mongoose");
const validator = require("validator");

const addIncome = async (req, res) => {
  const usersModel = mongoose.model("users");
  const transactionsModel = mongoose.model("transactions");

  const { amount, reference } = req.body;
  // validations
  if (!amount) throw "Amount must be provided!";
  if (amount <= 0) throw "Amount must be greater than 0";
  if (!validator.isNumeric(amount.toString()))
    throw "Amount must be a valid number";
  if (!reference) throw "reference  must be provided!";
  if (reference.length < 0 && password.length > 100)
    throw "Reference must be less than 100 characters long!";

  const transaction = await transactionsModel.create({
    userId: req.user._id,
    amount,
    type: "income",
    reference,
  });

  await usersModel.updateOne(
    {
      _id: req.user._id,
    },
    {
      $inc: {
        balance: amount,
      },
    },
    {
      runValidators: true,
    }
  );

  console.log(transaction, req.user._id);
  res.status(201).json({
    status: "Success",
    message: "Income added successfully",
    data: transaction,
  });
};

module.exports = addIncome;
