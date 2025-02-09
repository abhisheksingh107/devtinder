const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSingupData } = require("./utils/validation");
const brycpt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSingupData(req);
    const { firstName, lastName, emailId, password } = req.body;
    // ecnrypt the password
    const passwordHash = await brycpt.hash(password, 10);
    // Creaing a new instance of the User Model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added Successfully");
  } catch (error) {
    res
      .status(400)
      .send("Error Occuring while saving this user: " + error.message);
  }
});

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credential");
    }

    const isValidPassWord = await user.validatePassword(password);
    if (isValidPassWord) {
      const token = await user.getJWTToken();
      res.cookie("token", token, { expires: new Date(Date.now() + 900000) });
      res.send("Login Successfull");
    } else {
      throw new Error("Invalid Credential");
    }
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
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
