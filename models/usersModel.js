const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Your name is required"],
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

const userModel = mongoose.model("users", usersSchema);
module.exports = userModel;
