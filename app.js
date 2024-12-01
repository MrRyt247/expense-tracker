require("express-async-errors");
const express = require("express");
const errorHandler = require("./handlers/errorHandler");
require("dotenv").config();
const app = express();

const mongoose = require("mongoose");

// connections
mongoose
  .connect(process.env.DB_CONNECTION, {})
  .then(() => {
    console.log("DB connection successful");
  })
  .catch(() => {
    console.log("DB connection Failed");
  });

app.use(express.json());

// Model intialization
require("./models/usersModel");

// End of Routes
app.use(errorHandler);

app.listen(process.env.PORT_NUMBER, () => {
  console.log("Server started at " + process.env.PORT_NUMBER);
});
