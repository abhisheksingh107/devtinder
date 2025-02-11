const express = require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter = express.Router();
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      //  Validate status field
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }

      //   Prevent sending request to yourself

      if (fromUserId.toString() === toUserId) {
        return res
          .status(400)
          .json({ error: "You can't send request to yourself!" });
      }

      //   Validate toUser is present in the DB
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({ error: "User is not found" });
      }

      //  Check if a request already exists
      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingRequest) {
        return res.status(400).json({ error: "Request already sent" });
      }

      //   Create new connection request
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      await connectionRequest.save();
      res.send("connection request sent successfully!");
    } catch (error) {
      res.status(400).send("Error :" + error.message);
    }
  }
);

module.exports = requestRouter;
