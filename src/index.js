require("dotenv").config();
var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", function rootPage(req, res) {
  res.send("Hello");
});

app.listen(PORT, function ourServer() {
  console.log(`App listen on port 3000`);
});
