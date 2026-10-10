var express = require("express");
var router = express.Router();
var fs = require("fs");
var { v4 } = require("uuid");
router.get("/getAllStudents", (req, res) => {
  var students = JSON.parse(fs.readFileSync("students.txt").toString());
  // res.send(students);
  // res.render("Students", { students: students });
  res.render("students", { students });
});

router.post("/addStudent", (req, res) => {
  var students = JSON.parse(fs.readFileSync("students.txt").toString());
  var id = v4();
  students.push({ ...req.body, id });
  fs.writeFileSync("students.txt", JSON.stringify(students));
  res.send("agura babu");
});

router.delete("/deleteStudent/:id", (req, res) => {
  var students = JSON.parse(fs.readFileSync("students.txt").toString());
  var temp = students.filter((student) => {
    if (student.id == req.params.id) {
      return false;
    } else {
      return true;
    }
  });
  fs.writeFileSync("students.txt", JSON.stringify(temp));
  res.send("agura babu");
});

router.put("/updateStudent", (req, res) => {
  var students = JSON.parse(fs.readFileSync("students.txt").toString());
  var temp = students.map((student) => {
    if (student.id == req.body.id) {
      return { ...req.body };
    } else {
      return { ...student };
    }
  });
  fs.writeFileSync("students.txt", JSON.stringify(temp));
  res.send("agura babu");
});

module.exports = router;
