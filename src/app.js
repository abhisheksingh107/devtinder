const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
    res.send("Hello From the hello");
})

app.use((req, res)=>{
   res.send("Hello from the server!");
});


app.listen(7777, () => {
  console.log("server is successfully listening  on on port 7777");
})