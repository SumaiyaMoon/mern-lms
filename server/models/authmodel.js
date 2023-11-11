const mongoose = require("mongoose");
//student schema

const UserSchema = mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentFatherName: {
    type: String,
    required: true,
  },
  studentCity: {
    type: String,
    required: true,
  },
  studentCountry: {
    type: String,
    required: true,
  },
  studentGender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  studentDOB: {
    type: Date,
    required: true,
  },
  studentContact: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  cnic: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ["Student", "None selected"],
    required: true,
  },
  lastQual: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
