require("express-async-errors");
const express = require("express");
const errorHandler = require("./handlers/errorHandler");
require("dotenv").config();
const app = express();

app.use(express.json());

// End of Routes
app.use(errorHandler);

app.listen(process.env.PORT_NUMBER, () => {
  console.log("Server started at " + process.env.PORT_NUMBER);
});
