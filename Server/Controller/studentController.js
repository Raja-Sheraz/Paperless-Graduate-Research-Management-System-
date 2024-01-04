const StudentData = require("../Models/studentRegister");
const TeacherData = require("../Models/TeacherRegister");
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await TeacherData.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({error: "Internal Server Error"});
  }
};

exports.selectTeacher = async (req, res) => {
  try {
    const {studentId, teacherId} = req.params;

    const student = await StudentData.findById(studentId);
    const teacher = await TeacherData.findById(teacherId);

    if (!student || !teacher) {
      return res.status(404).json({error: "Student or Teacher not found"});
    }

    // Update the student's supervisor to the selected teacher
    student.supervisor = teacherId;
    await student.save();

    // Update the teacher's array with the student's ID
    teacher.students.push(studentId);
    await teacher.save();

    res.json({message: "Teacher selected successfully"});
  } catch (error) {
    res.status(500).json({error: "Internal Server Error"});
  }
};
