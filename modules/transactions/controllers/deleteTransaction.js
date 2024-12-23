const mongoose = require("mongoose");
const validator = require("validator");

const deleteTransaction = async (req, res) => {
  const usersModel = mongoose.model("users");
  const transactionsModel = mongoose.model("transactions");

  const { id } = req.param;

  // validations
  if (!amount) throw "Amount must be provided!";
  if (!validator.isNumeric(amount.toString()))
    throw "Amount must be a valid number";
  if (!reference) throw "reference  must be provided!";
  if (reference.length < 0 && password.length > 100)
    throw "Reference must be less than 100 characters long!";

  const transaction = await transactionsModel.create({
    userId: req.userId,
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
        balance: amount * -1,
      },
    },
    {
      runValidators: true,
    }
  );

  console.log(transaction, req.user._id);
  res.status(200).json({
    status: "Success",
    message: "Income deleted successfully",
    data: transaction,
  });
};

module.exports = deleteTransaction;
