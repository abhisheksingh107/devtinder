const express = require("express");

const app = express();

const { userAuth, adminAuth } = require("./middleware/auth");

app.use("/user", userAuth);

app.use("/admin", adminAuth);

app.get("/admin/getData",userAuth, (req, res) => {
  res.send("All Admin Data send");
});                

app.get("/user/getData", (req, res) => {
  res.send("All Data send");
});

app.listen(7777, () => {
  console.log("server is successfully listening  on on port 7777");
});
