const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  // Creating a new instance of a user model
  const user = new User({
    firstName: "Abhishek",
    lastName: "Singh",
    emailId: "abhishek@gmail.com",
    password: "abhi@123",
  });

  try {
    await user.save();
    res.send("User added Successfully");
  } catch (error) {
    console.error(err);
    res.status(500).send("An error occured while saving the user");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("server is successfully listening  on on port 7777");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!");
  });
