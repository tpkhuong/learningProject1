require("dotenv").config();
var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
/*** path.join(__dirname, "directory"). the directory path has to be from this file
 * path.join will work with the path that we pass into the src attribute of link and script elements. we don't have to include views or public in our path value in ejs file
 * ***/

app.set("views", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "../public")));
/*** path.join(__dirname, "directory"). the directory path has to be from this file
 * path.join will work with the path that we pass into the src attribute of link and script elements. we don't have to include views or public in our path value in ejs file
 * ***/
app.get("/", function rootPage(req, res) {
  res.render("gettingBetter");
});

app.listen(PORT, function ourServer() {
  console.log(`App listen on port ${PORT}`);
});
