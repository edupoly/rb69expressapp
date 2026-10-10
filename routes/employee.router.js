var express = require("express");
var router = express.Router();

const {
  getAllEmployeesController,
  addEmployeeController,
  deleteEmployeeController,
  editEmployeeController,
} = require("../controllers/employee.controller");

router.get("/getAllEmployees", getAllEmployeesController);

router.post("/addEmployee", addEmployeeController);

router.delete("/deleteEmployee/:id", deleteEmployeeController);

router.put("/updateEmployee", editEmployeeController);

module.exports = router;
