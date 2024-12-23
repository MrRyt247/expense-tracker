const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");
const userDashboard = require("./controllers/userDashboard");
const auth = require("../../middleware/auth");

const transactionRoutes = express.Router();

// Routes
transactionRoutes.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Transactions Route",
  });
});

transactionRoutes.post("/register", register);
transactionRoutes.post("/login", login);

transactionRoutes.use(auth);

// Protected Routes
transactionRoutes.get("/dashboard", userDashboard);

module.exports = transactionRoutes;
