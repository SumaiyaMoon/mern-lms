import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SMInput from "../../components/SMInput";
import SMButton from "../../components/SMButton";
import { Typography, Box, Paper, Grid } from "@mui/material";
import { Post } from "../../config/axios/api-methods";
import axios from "axios";

export default function SMLogin() {
  const [model, setModel] = useState<any>({});
  const navigate = useNavigate();

  const fillModel = (key: string, val: any) => {
    setModel((prevModel: any) => ({
      ...prevModel,
      [key]: val,
    }));
  };

  let LoginUser = async () => {
    try {
      const res = await Post("/auth/login", model);
      const { token, user } = res.data.data;

      // Store the token securely (you may want to use more secure storage methods)
      localStorage.setItem("authToken", token);

      // Set the token in the headers for subsequent requests
      setAuthToken(token);

      // Navigate to the appropriate dashboard based on the user role
      handleNavigation(user.role.toLowerCase());
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure, show error message, etc.
    }
  };

  const handleNavigation = (role: string) => {
    switch (role) {
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

  return (
    <Box
      className="bg_img_login"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper className="paperColor" elevation={3} sx={{ p: 4, maxWidth: 400 }}>
        <Typography variant="h6" className="fw-bold" gutterBottom>
          Login
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <SMInput
                value={model.email}
                name="email"
                label="Email"
                type="email"
                onChange={(e: any) => fillModel("email", e.target.value)}
                className="py-2"
              />
            </Grid>
            <Grid item xs={12}>
              <SMInput
                value={model.password}
                name="password"
                label="Password"
                type="password"
                onChange={(e: any) => fillModel("password", e.target.value)}
                className="py-2"
              />
            </Grid>
            <Grid item xs={12}>
              <SMInput
                value={model.role}
                name="role"
                label="Role"
                type="text"
                onChange={(e: any) => fillModel("role", e.target.value)}
                className="py-2"
              />
            </Grid>
            <Grid item xs={12}>
              <SMButton
                type="button"
                onClick={LoginUser}
                label="Login"
                className="py-2"
              />
              <Typography className="py-2">
                Don't have an account?
                <Link to="/SignUp">SignUp</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

// Function to set the token in the headers
const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
