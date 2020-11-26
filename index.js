require("dotenv").config();
var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

//from our index.js directory. the absolute path. public and views are in the same directory as index.js
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", function rootPage(req, res) {
  res.render("gettingBetter");
});

app.listen(PORT, function listening() {
  console.log(`listening on port ${PORT}`);
});
