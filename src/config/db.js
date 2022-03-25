const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    `mongodb+srv://Arbaz:Arbaz123@cluster0.zv7ao.mongodb.net/validations?`
  );
};

module.exports = connect;