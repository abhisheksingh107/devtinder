const express = require("express");
const User = require("../models/user");
const authRouter = express.Router();
const brycpt = require("bcrypt");
const { validateSingupData } = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
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

module.exports = authRouter;
