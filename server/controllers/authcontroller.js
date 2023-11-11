const { SendResponse } = require("../helpers/helpers");
const UserModel = require("../models/authmodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AuthController = {
  signUp: async (req, res) => {
    try {
      let {
        studentName,
        studentFatherName,
        studentCity,
        studentCountry,
        studentGender,
        studentDOB,
        studentContact,
        email,
        password,
        cnic,
        role,
        lastQual,
      } = req.body;

      let obj = {
        studentName,
        studentFatherName,
        studentCity,
        studentCountry,
        studentGender,
        studentDOB,
        studentContact,
        email,
        password,
        cnic,
        role,
        lastQual,
      };
      let errArr = [];
      if (!obj.email) {
        errArr.push("Email is  Required");
      }
      if (!obj.password) {
        errArr.push("Password is  Required");
      }
      if (errArr.length > 0) {
        res.status(400).send(SendResponse(false, "Validation Error", errArr));
        return;
      }

      let userExist = await UserModel.findOne({ email: obj.email });

      if (userExist) {
        res
          .status(400)
          .send(SendResponse(false, " User Already Exist with Email"));
        return;
      }

      // Encrypting throught BCRYPTJS
      obj.password = await bcrypt.hash(obj.password, 10);

      let User = new UserModel(obj);
      let result = await User.save();

      if (result) {
        res
          .status(200)
          .send(SendResponse(true, "User Created Successfully", result));
      }
    } catch (error) {
      res.status(500).send(SendResponse(false, "Internal Server Error", error));
    }
  },

  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      let obj = { email, password };
      let existingUser = await UserModel.findOne({
        email: obj.email,
      });

      if (existingUser) {
        let correctPassword = await bcrypt.compare(
          obj.password,
          existingUser.password
        );

        if (correctPassword) {
          let token = jwt.sign({ ...existingUser }, process.env.SECRET_KEY);

          res.status(200).send(
            SendResponse(true, "Login Successfully", {
              token: token,
              user: existingUser,
            })
          );
        } else {
          res.status(404).send(SendResponse(false, "Password Not Match"));
        }
      } else {
        res
          .status(404)
          .send(SendResponse(false, "User Not Found with this Email"));
      }
    } catch (error) {
      res.status(500).send(SendResponse(false, "Internal Server Error", err));
    }
  },

  protected: () => {},
};

module.exports = AuthController;
