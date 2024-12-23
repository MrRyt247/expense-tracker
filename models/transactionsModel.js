const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
    },
    reference: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const transactionModel = mongoose.model("users", transactionsSchema);
module.exports = transactionModel;