const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");
const cors = require("cors"); // Added cors

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

router.post("/emailsend", (req, res) => {
  const {email, password} = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Hello! Your PGMS Account Password",
      html: `<h3>Your Account Password is Given Below </h3><br></br>
      <h3>User Name:${email}</h3>\n
      <h3>Password:${password}</h3>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error", error);
      } else {
        console.log("Success" + info.response);
        res.status(201).json({status: 201, info});
      }
    });
  } catch (error) {
    res.status(401).json({status: 401, error});
  }
});

module.exports = router;
