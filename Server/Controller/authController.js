const User = require("../Models/user");
const StudentData = require("../Models/studentRegister");
const TeacherData = require("../Models/TeacherRegister");

const {hashPassword, comparePassword} = require("../helpers/auth");
const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");

const test = (req, res) => {
  res.send("Test Is Working");
};

//Register End Point
const registerUser = async (req, res) => {
  try {
    const {name, email, password} = req.body;

    //check if password is good
    if (!password || password.length < 8) {
      return res.json({
        error:
          "password is required and atleast should be at least 8 characters",
      });
    }
    //check email
    const exist = await User.findOne({email});
    if (exist) {
      return res.json({
        error: "email already exist",
      });
    }

    //create user in database
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (e) {
    console.log(e);
  }
};

//studentRegister

const studentRegister = async (req, res) => {
  try {
    const {name, cnic, phone, address, email, department, gender, password} =
      req.body;

    //check email
    const exist = await StudentData.findOne({email});
    if (exist) {
      return res.json({
        error: "email already exist",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await StudentData.create({
      name,
      cnic,
      phone,
      address,
      email,
      department,
      gender,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (e) {
    console.log(e);
  }
};

//Login End Point
const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;

    //check if user exist
    const user = await StudentData.findOne({email});
    if (!user) {
      return res.json({
        error: "user not found",
      });
    }

    //check if password match
    const match = await comparePassword(password, user.password);
    if (match) {
      // res.json("password match");
      jwt.sign(
        {email: user.email, id: user._id, name: user.name},
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    }

    if (!match) {
      res.json({
        error: "password do not match",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

//Login Other Users
const LoginOtherUser = async (req, res) => {
  const {role, email, password} = req.body;

  try {
    // Check if user exists
    const user = await TeacherData.findOne({email});

    if (!user) {
      return res.json({
        error: "User not found",
      });
    }

    // Check if password matches
    const passwordMatch = await comparePassword(password, user.password);

    if (passwordMatch) {
      // Check if role matches (adjust this based on your requirements)
      if (user.role !== role) {
        return res.json({
          error: "Role does not match",
        });
      }

      // Generate and send JWT token
      jwt.sign(
        {email: user.email, id: user._id, name: user.name},
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    } else {
      res.json({
        error: "Password does not match",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

//Teacher Registration
const TeacherRegistration = async (req, res) => {
  try {
    const {
      name,
      cnic,
      phone,
      address,
      email,
      qualification,
      department,
      gender,
      password,
      role,
    } = req.body;

    //check email
    const exist = await TeacherData.findOne({email});
    if (exist) {
      return res.json({
        error: "email already exist",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await TeacherData.create({
      name,
      cnic,
      phone,
      address,
      email,
      qualification,
      department,
      gender,
      role,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (e) {
    console.log(e);
  }
};
//get Teacher Data
const getTeacher = (req, res) => {
  TeacherData.find({})
    .then(user => res.json(user))
    .catch(err => console.log(err));
};

const getProfile = (req, res) => {
  const {token} = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

const getStudent = (req, res) => {
  StudentData.find({})
    .then(user => res.json(user))
    .catch(err => console.log(err));
};

const getUser = (req, res) => {
  const id = req.params.id;
  StudentData.findById({_id: id})
    .then(user => res.json(user))
    .catch(err => console.log(err));
};

const UpdateUser = (req, res) => {
  const id = req.params.id;
  StudentData.findByIdAndUpdate(
    {_id: id},
    {
      email: req.body.email,
      password: req.body.password,
    }
  )
    .then(user => res.json(user))
    .catch(err => console.log(err));
};

const getUser1 = (req, res) => {
  const id = req.params.id;
  TeacherData.findById({_id: id})
    .then(user => res.json(user))
    .catch(err => console.log(err));
};

const UpdateUser1 = (req, res) => {
  const id = req.params.id;
  TeacherData.findByIdAndUpdate(
    {_id: id},
    {
      role: req.body.role,
      // email: req.body.email,
      // password: req.body.password,
    }
  )
    .then(user => res.json(user))
    .catch(err => console.log(err));
};

const TeacherDelete = (req, res) => {
  const id = req.params.id;
  TeacherData.findByIdAndDelete({_id: id})
    .then(user => res.json(user))
    .catch(err => res.json(err));
};

//Student Delete
const StudentDelete = (req, res) => {
  const id = req.params.id;
  StudentData.findByIdAndDelete({_id: id})
    .then(user => res.json(user))
    .catch(err => res.json(err));
};

//update student
const UpdateStudent = (req, res) => {
  const id = req.params.id;
  StudentData.findByIdAndUpdate(
    {_id: id},
    {
      name: req.body.name,
      cnic: req.body.cnic,
      phone: req.body.phone,
      address: req.body.address,
      email: req.body.email,
      department: req.body.department,
      gender: req.body.gender,
    }
  )
    .then(user => res.json(user))
    .catch(err => res.json(err));
};

const UpdateTeacher = (req, res) => {
  const id = req.params.id;
  TeacherData.findByIdAndUpdate(
    {_id: id},
    {
      name: req.body.name,
      cnic: req.body.cnic,
      phone: req.body.phone,
      address: req.body.address,
      email: req.body.email,
      department: req.body.department,
      gender: req.body.gender,
      qualification: req.body.qualification,
      role: req.body.role,
    }
  )
    .then(user => res.json(user))
    .catch(err => res.json(err));
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
  studentRegister,
  getStudent,
  getUser,
  UpdateUser,
  TeacherRegistration,
  getTeacher,

  getUser1,
  UpdateUser1,

  UpdateStudent,
  UpdateTeacher,

  LoginOtherUser,
  TeacherDelete,
  StudentDelete,
  // SendEmail,
};
