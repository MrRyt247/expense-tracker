const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Your first name is required"],
    },
    middlename: {
      type: String,
      default: null,
    },
    lastname: {
      type: String,
      required: [true, "Your last name is required"],
    },
    email: {
      type: String,
      required: [true, "Your email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Your password is required"],
    },
    balance: {
      type: Number,
      required: [true, "Your deposit is required"],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const usersModel = mongoose.model("users", usersSchema);
module.exports = usersModel;
