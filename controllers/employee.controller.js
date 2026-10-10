var fs = require("fs");
var { v4 } = require("uuid");

var getAllEmployeesController = (req, res) => {
  var employees = JSON.parse(fs.readFileSync("employees.txt").toString());
  // res.send(employees);
  res.render("Employees", { employees });
};
var addEmployeeController = (req, res) => {
  var employees = JSON.parse(fs.readFileSync("employees.txt").toString());
  var newEmployee = { ...req.body, id: v4() };
  employees.push(newEmployee);
  fs.writeFileSync("employees.txt", JSON.stringify(employees));
  res.send("data add indi");
};

var deleteEmployeeController = (req, res) => {
  var employees = JSON.parse(fs.readFileSync("employees.txt").toString());
  var temp = employees.filter((employee) => {
    if (employee.id == req.params.id) {
      return false;
    } else {
      return true;
    }
  });
  fs.writeFileSync("employees.txt", JSON.stringify(temp));
  res.send("data delete indi");
};

var editEmployeeController = (req, res) => {
  var employees = JSON.parse(fs.readFileSync("employees.txt").toString());
  var temp = employees.map((employee) => {
    if (employee.id == req.body.id) {
      return { ...req.body };
    } else {
      return { ...employee };
    }
  });
  fs.writeFileSync("employees.txt", JSON.stringify(temp));
  res.send("data update indi");
};

module.exports = {
  getAllEmployeesController,
  addEmployeeController,
  deleteEmployeeController,
  editEmployeeController,
};
