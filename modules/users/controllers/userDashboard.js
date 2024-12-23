const mongoose = require("mongoose");

const userDashboard = async (req, res) => {
  const usersModel = mongoose.model("users");
  const transactionsModel = mongoose.model("transactions");

  const user = await usersModel
    .findOne({
      _id: req.user._id,
    })
    .select("-password -__v");

  const transactions = await transactionsModel
    .find({
      userId: req.user._id,
    })
    .select("-userId -__v");

  res.status(200).json({
    status: "Success",
    message: "Welcome to User Dashboard",
    data: user,
    transaction: transactions,
  });
};

module.exports = userDashboard;
