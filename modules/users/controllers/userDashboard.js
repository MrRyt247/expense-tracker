const mongoose = require("mongoose");

const userDashboard = async (req, res) => {
  const usersModel = mongoose.model("users");

  const user = await usersModel
    .findOne({
      _id: req.user._id,
    })
    .select("-password");

  res.status(200).json({
    status: "Welcome to User Dashboard",
    data: user,
  });
};

module.exports = userDashboard;
