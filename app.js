require("express-async-errors");
const express = require("express");
const errorHandler = require("./handlers/errorHandler");
require("dotenv").config();
const app = express();

// const userRoutes = require("./modules/users/user.routes");

const mongoose = require("mongoose");
const userRoutes = require("./modules/users/user.routes");

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
app.use(express.json());

// Routes

app.use("/users", userRoutes);

// End of Routes
app.use(errorHandler);

app.listen(process.env.PORT_NUMBER, () => {
  console.log("Server started at " + process.env.PORT_NUMBER);
});
