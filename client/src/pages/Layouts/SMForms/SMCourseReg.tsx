import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fbAdd } from "../../../config/firebase/firebase-methods";
import SMInput from "../../../components/SMInput";
import SMButton from "../../../components/SMButton";
import { Box, Typography, Paper, Grid } from "@mui/material";
import SMSelect from "../../../components/SMSelect";

export default function SMCourseReg() {

  const [model, setModel] = useState<any>({});
  const fillModel = (key: string, val: string) => {
    model[key] = val;
    setModel({ ...model });
  };


  let AddCourse = () => {
    
    console.log(model);
    fbAdd("courses", model)
    .then((res: any) => {
      console.log(res);
      // dispatch(add({...res}))
alert("courses added successfully")
})
      .catch((err) => {
        console.log(err);
        
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
      <Paper className="paperColor " elevation={3} sx={{ margin: "30px", padding: "30px"}}>
        <Typography variant="h6" className="fw-bold text-center" gutterBottom>
          Course Creation
        </Typography>
        <form>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <SMInput
                value={model.courseName}
                name="courseName"
                label="course Name"
                type="text"
                onChange={(e: any) => fillModel("courseName", e.target.value)}
                className="py-2"
              />
              </Grid>
            <Grid item xs={6}>
              <SMInput
                value={model.courseDuration}
                name="courseDuration"
                label="course Duration in Weeks"
                type="number"
                onChange={(e: any) => fillModel("courseDuration", e.target.value)}
                className="py-2"
              />
              </Grid>
            <Grid item xs={6}>
              <SMInput
                value={model.courseFee}
                name="courseFee"
                label="course Fee in pkr"
                type="number"
                onChange={(e: any) => fillModel("courseFee", e.target.value)}
                className="py-2"
              />
              </Grid>
            <Grid item xs={6}>
              <SMInput
                value={model.courseTeacher}
                name="courseTeacher"
                label="course Teacher"
                type="text"
                onChange={(e: any) => fillModel("courseTeacher", e.target.value)}
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
                label="Add Course"
                onClick={AddCourse}
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
                label="Go back"
                onClick={()=>{window.history.back()}}
                className="py-2"
              />
             
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}