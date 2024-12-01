const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Your first name is required"],
  },
  middlename: {
    type: String || null,
  },
  lastname: {
    type: String,
    required: [true, "Your first name is required"],
  },
  email: {
    type: String,
    required: [true, "Your first name is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your first name is required"],
  },
  balance: {
    type: Number,
    required: [true, "Your first name is required"],
    default: 0,
  },
});

const userModel = mongoose.model("users", usersSchema);
module.exports = userModel;
