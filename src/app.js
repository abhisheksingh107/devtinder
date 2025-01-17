const express = require("express");

const app = express();

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/getUserdata", (req, res) => {
  try {
    throw new Error("dvjfhb");
    res.send("User data sent");
  } catch (err) {
    res.status(500).send("Someting went wrong!");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(7777, () => {
  console.log("server is successfully listening  on on port 7777");
});
