const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { get } = require("mongoose");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Creaing a new instance of the User Model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added Successfully");
  } catch (error) {
    res.status(400).send("Error Occuring while saving this user");
  }
});

app.get("/user", async (req, res) => {
  const userPassword = req.body.password;
  try {
    const user = await User.find({ password: userPassword });
    if (user.length == 0) {
      res.status(400).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something went Wrong");
  }
});

// Feed API, GET /feed fetching all the user from the databases
app.get("/feed", async (req, res) => {
  const userPassword = req.body.password;
  try {
    const user = await User.find({ password: userPassword });
    if (user.length == 0) {
      res.status(400).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something went Wrong");
  }
});
// Delete API for deleting the User
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user is deleted successfully");
  } catch (error) {
    res.status(400).send("SomeThing went Wrong");
  }
});

// Updating the data by Patch API

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate({_id: userId}, data);
    res.send("User Updates Successfully");
  } catch (error) {
    res.status(400).send("Something went wrong");
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
