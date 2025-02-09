const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    // Read the token from the cookies
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid");
    }
    // Validate the token
    const decodeObj = await jwt.verify(token, "DevTinder@123");
    const { _id } = decodeObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("Can't find the user, Please login again");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Error" + error.message);
  }
};

module.exports = {
  userAuth,
};
