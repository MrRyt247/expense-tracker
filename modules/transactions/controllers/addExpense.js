const mongoose = require("mongoose");
const validator = require("validator");

const addExpense = async (req, res) => {
  const usersModel = mongoose.model("users");
  const transactionsModel = mongoose.model("transactions");

  const { amount, reference } = req.body;

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
    type: "expense",
    reference,
  });

  await usersModel.updateOne(
    {
      _id: req.user._id,
    },
    {
      $inc: {
        balance: amount * -1,
      },
    },
    {
      runValidators: true,
    }
  );

  res.status(201).json({
    status: "Success",
    message: "Expense added successfully",
    data: transaction,
  });
};

module.exports = addExpense;
