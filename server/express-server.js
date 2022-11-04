const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log(req.body);
  console.log("/ accessed");
  res.send("got");
});

app.listen(3000);
