const express = require("express");

const auth = require("../../middleware/auth");
const addIncome = require("./controllers/addIncome");
const deleteTransaction = require("./controllers/deleteTransaction");
const addExpense = require("./controllers/addExpense");

const transactionRoutes = express.Router();

// Routes
transactionRoutes.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Transactions Route",
  });
});

// Protected Routes

transactionRoutes.use(auth);
transactionRoutes.post("/addIncome", addIncome);
transactionRoutes.post("/addExpense", addExpense);
transactionRoutes.delete("/:id", deleteTransaction);

module.exports = transactionRoutes;
