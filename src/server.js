const express = require("express");
const connect = require("./config/db");
const app = express();
const port = 2222;

app.use(express.json());

const userController = require("./controllers/user.controller");

app.use("/users", userController);

const start = async () => {
  try {
    await connect();
  } catch (error) {
    console.log("error:", error);
  }
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
};

module.exports = start;
