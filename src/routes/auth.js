const express = require("express");
const User = require("../models/user");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const { validateSingupData } = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of the data
    validateSingupData(req);
    const { firstName, lastName, emailId, password } = req.body;
    // ecnrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
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
      .send("Error : " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credential");
    }

    const isValidPassWord = await bcrypt.compare(password, user.password);
    if (isValidPassWord) {
      // Generate the JWT Token
      const token = await user.getJWTToken();
      // Set the token in the cookie
      res.cookie("token", token, { expires: new Date(Date.now() + 900000) });
      res.send("Login Successfull");
    } else {
      throw new Error("Invalid Credential");
    }
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});


authRouter.post("/logout", async (req, res) => {
  res.clearCookie("token");
  res.send("Logout Successfully");
});  

module.exports = authRouter;
