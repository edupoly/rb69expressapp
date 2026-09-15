var express = require("express");
var app = express();
var cors = require("cors");
var fs = require("fs");
var { v4 } = require("uuid");

app.use(cors());

app.use(express.static(__dirname + "/free"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/sreeleela", function (req, res) {
  console.log("request received for sreeleela");
  res.send("Undara babu");
});

app.get("/rukku", (req, res) => {
  res.send("Bagunnara");
});

app.get("/add/:a/:b", (req, res) => {
  console.log(req.params);
  res.send(+req.params.a + +req.params.b);
});

app.get("/mul", (req, res) => {
  console.log(req.query);
  res.send(req.query.a * req.query.b);
});

app.post("/div", (req, res) => {
  console.log(req.body);
  res.send("Please wait");
});

app.get("/employees", (req, res) => {
  var employees = JSON.parse(fs.readFileSync("employees.txt").toString());

  res.send(employees);
});

app.post("/employees/addEmployee", (req, res) => {
  var employees = JSON.parse(fs.readFileSync("employees.txt").toString());

  var newEmployee = { ...req.body, id: v4() };
  employees.push(newEmployee);
  fs.writeFileSync("employees.txt", JSON.stringify(employees));
  res.send("data add indi");
});

app.listen(4000, () => {
  console.log("Server Uriking on 4000");
});
