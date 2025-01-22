const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Creating a new instance of a user model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added Successfully");
  } catch (error) {
    res.status(500).send("Error Saving the User:" );
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
