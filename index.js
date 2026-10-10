var express = require("express");
var app = express();
var path = require("path");
var cors = require("cors");
var fs = require("fs");
var cookieParser = require("cookie-parser");
var session = require("express-session");

app.use(express.static(__dirname + "/public"));

// app.set("view engine", "ejs");
app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "views"));

var studentRouter = require("./routes/student.router");
var employeeRouter = require("./routes/employee.router");
var productsRouter = require("./routes/products.routes");

app.use(express.static(__dirname + "/free"));
app.use(cors());
app.use(cookieParser());

app.use(session({ secret: "evariki cheppaku", cookie: { maxAge: 365*24*60*60 * 1000 } }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/login", (req, res) => {
  var allusers = JSON.parse(fs.readFileSync("users.txt").toString());
  var temp = allusers.find((user) => {
    if (
      user.username == req.body.username &&
      user.password == req.body.password
    ) {
      return true;
    }
  });
  console.log("user", temp);
  if (temp) {
    req.session.user = {
      username: req.body.username,
      password: req.body.password,
    };
    res.redirect("/");
  } else {
    res.redirect("/error-login.html");
  }
});
function checkLogin(req, res, next) {
  console.log("req session ", req.session.user);
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login.html");
  }
}
app.use("/students", checkLogin, studentRouter);
app.use("/employees", checkLogin, employeeRouter);
app.use("/products", checkLogin, productsRouter);

app.listen(4000, () => {
  console.log("Server Uriking on 4000");
});
