require("express-async-errors");

const express = require("express");
const cors = require("cors");
const errorHandler = require("./handlers/errorHandler");
require("dotenv").config();
const app = express();
app.use(cors);

const mongoose = require("mongoose");
const userRoutes = require("./modules/users/user.routes");
const transactionRoutes = require("./modules/transactions/transactions.routes");

// connections
mongoose
  .connect(process.env.DB_CONNECTION, {})
  .then(() => {
    console.log("DB connection successful");
  })
  .catch(() => {
    console.log("DB connection Failed");
  });

// Model intialization
require("./models/usersModel");
require("./models/transactionsModel");

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Expense Tracker!",
  });
});
app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);
app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "Failed!",
    message: "Page Not Found!",
  });
});

// End of Routes
app.use(errorHandler);

app.listen(process.env.PORT_NUMBER, () => {
  console.log("Server started at " + process.env.PORT_NUMBER);
});
