const express = require("express");
const { userAuth } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const {
  validatePassword,
  validateProfileEditData,
} = require("../utils/validation");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

profileRouter.patch("/profile/update", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Error Occured while updating the profile");
    }
    const loggedUser = req.user;
    console.log(loggedUser);
    Object.keys(req.body).forEach(
      (field) => (loggedUser[field] = req.body[field])
    );
    await loggedUser.save();
    res.send("Profile Updated Successfully");
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

profileRouter.patch("/profile/updatePassword", userAuth, async (req, res) => {
  try {
    if (!validatePassword(req)) {
      throw new Error("Invalid Password");
    }
    const loggedUser = req.user;
    const { oldPassword, newPassword } = req.body;
    const isValidPassWord = await bcrypt.compare(
      oldPassword,
      loggedUser.password
    );
    if (isValidPassWord) {
      const passwordHash = await bcrypt.hash(newPassword, 10);
      loggedUser.password = passwordHash;
      await loggedUser.save();
      res.send("Password Updated Successfully");
    } else {
      throw new Error("Invalid Password");
    }
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

module.exports = profileRouter;
