const mongoose = require("mongoose");
const validator = require("validator");

const deleteTransaction = async (req, res) => {
  const usersModel = mongoose.model("users");
  const transactionsModel = mongoose.model("transactions");

  //   const { id } = req.params;
  //   console.log(id, req.params);

  // validations
  if (!validator.isMongoId(req.params.id.toString()))
    throw "Provide a valid id!";

  const transaction = await transactionsModel.findOne({
    _id: req.params.id,
  });

  if (!transaction) throw "Transaction not found!";

  if (transaction.type === "income") {
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

  const dtransaction = await transactionsModel.deleteOne({
    _id: req.params.id,
  });

  console.log(transaction, req.user._id);
  res.status(200).json({
    status: "Success",
    message: "Income deleted successfully",
    data: [transaction, dtransaction],
  });
};

module.exports = deleteTransaction;
