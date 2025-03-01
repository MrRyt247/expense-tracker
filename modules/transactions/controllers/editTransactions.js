const mongoose = require("mongoose");
const validator = require("validator");

const editTransaction = async (req, res) => {
  const usersModel = mongoose.model("users");
  const transactionsModel = mongoose.model("transactions");

  const { transaction_id, amount, type, reference } = req.body;

  if (!transaction_id) throw "Transaction id is required!";
  if (type !== "income" || type !== "expense")
    throw "Transaction type ,ust be an income or an expense!";
  if (!validator.isMongoId(transaction_id.toString()))
    throw "Provide a valid id!";

  const transaction = await transactionsModel.deleteOne({
    _id: req.params.id,
  });

  if (!transaction) throw "Transaction not found!";

  const updatedTransaction = await transactionsModel.updateOne(
    {
      _id: transaction_id,
    },
    {
      amount,
      type,
      reference,
    },
    {
      runValidators: true,
    }
  );

  if (type === "income") {
    await usersModel.updateOne(
      {
        _id: req.user._id,
      },
      {
        $inc: {
          balance: transaction.amount * -1,
        },
      },
      {
        runValidators: true,
      }
    );
  } else {
    await usersModel.updateOne(
      {
        _id: req.user._id,
      },
      {
        $inc: {
          balance: transaction.amount,
        },
      },
      {
        runValidators: true,
      }
    );
  }

  res.status(200).json({
    status: "Success",
    message: "Transaction Updated!",
    data: updatedTransaction,
  });
};

module.exports = editTransaction;
