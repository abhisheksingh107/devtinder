const express = require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter = express.Router();

requestRouter.post("/connection", userAuth, (req, res) => {
    res.send("Connection request sent successfully");
})


module.exports = requestRouter;