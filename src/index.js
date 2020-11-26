require("dotenv").config();
var express = require("express");

var app = express();
var PORT = process.env.PORT || 3000;

app.get("/", function rootPage(req, res) {
  res.send("../gettingBetter.html");
});

app.listen(3000, function ourServer() {
  console.log(`App listen on port 3000`);
});
