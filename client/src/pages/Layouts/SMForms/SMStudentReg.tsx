import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SMInput from "../../../components/SMInput";
import SMButton from "../../../components/SMButton";
import { Box, Typography, Paper, Grid } from "@mui/material";
import SMSelect from "../../../components/SMSelect";
import SMDatePicker from "../../../components/SMDatePicker";
import { Post } from "../../../config/axios/api-methods";
import axios from "axios";

export default function SMStudentReg() {
  const [model, setModel] = useState<any>({});
  const [selectedDate, setSelectedDate] = useState("");
  const [gender, setGender] = useState("Male");
  const [role, setRole] = useState("Student"); // Set default role to "Student"
  const [qualification, setQualification] = useState([
    "Matric",
    "Intermediate",
    "Graduate",
    "Masters",
  ]);
  const [lastqual, setLastQual] = useState(qualification[2]);
  const navigate = useNavigate();

  const fillModel = (key: string, val: string) => {
    setModel((prevModel: any) => ({
      ...prevModel,
      [key]: val,
    }));
  };

  const handleRole = (newValue: any) => {
    setRole(newValue);
  };

  const handleLastQual = (newValue: any) => {
    setLastQual(newValue);
  };

  const handleGender = (newValue: any) => {
    setGender(newValue);
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };
  const handleNavigation = (role: string) => {
    switch (role.toLowerCase()) {
      case "student":
        navigate("/studentdashboard");
        break;
      case "teacher":
        navigate("/teacherdashboard");
        break;
      case "institute":
        navigate("/institutedashboard");
        break;
      case "admin":
        navigate("/admindashboard");
        break;
      default:
        alert("Not Valid");
      // Navigate to signup or show an error
      // navigate("/signup");
    }
  };

  const signUpUser = () => {
    model.isActive = true;
    console.log(model);
    Post("/auth/signup", model)
      .then((res: any) => {
        console.log(res);
        if (res.data.data.isSuccessfull) {
          // Redirect the user based on their role
          handleNavigation(model.role);
        } else {
          alert("User creation failed. Please check the provided information.");
        }
      })
      .catch((err: any) => {
        console.error("Error creating user:", err);
        if (err.response) {
          console.log("Server responded with:", err.response.data);
        }
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <Box
      className="bg_img_login"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        className="paperColor"
        elevation={3}
        sx={{ margin: "30px", padding: "30px" }}
      >
        <Typography variant="h6" className="fw-bold text-center" gutterBottom>
          Student Registration
        </Typography>
        <form>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <SMInput
                value={model.studentName}
                name="studentName"
                label="Student Name"
                type="text"
                onChange={(e: any) => fillModel("studentName", e.target.value)}
                className="py-2"
              />
            </Grid>
            <Grid item xs={6}>
              <SMInput
                value={model.studentFatherName}
                name="studentFatherName"
                label="Student Father Name"
                type="text"
                onChange={(e: any) =>
                  fillModel("studentFatherName", e.target.value)
                }
                className="py-2"
              />
            </Grid>
            <Grid item xs={6}>
              <SMInput
                value={model.studentCity}
                name="studentCity"
                label="Student City"
                type="text"
                onChange={(e: any) => fillModel("studentCity", e.target.value)}
                className="py-2"
              />
            </Grid>
            <Grid item xs={6}>
              <SMInput
                value={model.studentCountry}
                name="studentCountry"
                label="Student Country"
                type="text"
                onChange={(e: any) =>
                  fillModel("studentCountry", e.target.value)
                }
                className="py-2"
              />
            </Grid>
            <Grid item xs={6}>
              <SMSelect
                value={gender}
                options={["Male", "Female"]}
                label="Gender"
                onChange={(gender) => {
                  fillModel("studentGender", gender);
                  handleGender(gender);
                }}
                className="py-2"
              />
            </Grid>
            <Grid item xs={6}>
              <SMDatePicker
                label="Date of Birth"
                onChange={(DOB) => {
                  fillModel("studentDOB", DOB);
                  handleDateChange(DOB);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <SMInput
                value={model.studentContact}
                name="studentContact"
                label="Contact"
                type="number"
                onChange={(e: any) =>
                  fillModel("studentContact", e.target.value)
                }
                className="py-2"
              />
            </Grid>

            <Grid item xs={6}>
              <SMInput
                value={model.email}
                name="email"
                label="Student Email"
                type="email"
                onChange={(e: any) => fillModel("email", e.target.value)}
                className="py-2"
              />
            </Grid>

            <Grid item xs={6}>
              <SMInput
                value={model.password}
                name="password"
                label="Password"
                type="password"
                onChange={(e: any) => fillModel("password", e.target.value)}
                className="py-2"
              />
            </Grid>
            <Grid item xs={6}>
              <SMInput
                value={model.cnic}
                name="cnic"
                label="CNIC"
                type="number"
                onChange={(e: any) => fillModel("cnic", e.target.value)}
                className="py-2"
              />
            </Grid>
            <Grid item xs={6}>
              <SMSelect
                value={role}
                options={["Student", "None selected"]}
                label="Account Type"
                onChange={(role) => {
                  fillModel("role", role);
                  handleRole(role);
                }}
                className="py-2"
              />
            </Grid>
            <Grid item xs={6}>
              <SMSelect
                value={lastqual}
                options={qualification}
                label="Last Qualification"
                onChange={(lastqual) => {
                  fillModel("lastQual", lastqual);
                  handleLastQual(lastqual);
                }}
                className="py-2"
              />
            </Grid>

            <Grid
              item
              xs={6}
              className="d-flex justigy-content-between align-items-center gap-5"
            >
              <SMButton
                type="button"
                label="SignUp"
                onClick={signUpUser}
                className="py-2"
              />
              <Typography className="py-2">
                Already Registered? <Link to="/Login">Login</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
