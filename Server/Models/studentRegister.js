const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
  name: String,
  cnic: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  address: String,
  email: {
    type: String,
    unique: true,
  },
  department: String,
  gender: String,
  password: String,
  supervisor: {
    type: Schema.Types.ObjectId,
    ref: "teacherRegistration", // Reference to the Teacher schema
  },
  pdf: {
    type: Schema.Types.ObjectId,
    ref: "Pdf",
  },
});

const userModel = mongoose.model("StudentRegistration", userSchema);
module.exports = userModel;
