const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://abhishekkumars356:syMvct1mYfgsaTHW@devtinder.ybltv.mongodb.net/devTinder"
  );
};

module.exports = connectDB;