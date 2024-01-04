const express = require("express");
const router = express.Router();
const studentController = require("../Controller/studentController");

router.get("/teachers", studentController.getTeachers);
router.post(
  "/select-teacher/:studentId/:teacherId",
  studentController.selectTeacher
);

module.exports = router;
