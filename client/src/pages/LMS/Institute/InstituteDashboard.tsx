import { Route, Routes } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import InstituteProfile from "./InstituteScreens/InstituteProfile";
import StudentDetail from "./InstituteScreens/StudentManagement/StudentDetail";
import StudentList from "./InstituteScreens/StudentManagement/StudentList";
import CourseList from "./InstituteScreens/Courses/CourseList";
import QuizList from "./InstituteScreens/Courses/QuizList";
import SMDashboard from "../../Layouts/SMDashboard";
import AssessmentList from "./InstituteScreens/Courses/AssessmentList";
import NotFound from "../../NotFound";

export default function InstituteDashboard() {
  const pages = [
    {
      text: "Institute Profile",
      link: "instituteprofile",
    },
    {
      text: "Student List",
      link: "studentlist",
    },
    {
      text: "Course List",
      link: "courselist",
    },
    {
      text: "Quiz List",
      link: "quizlist",
    },
    {
      text: "Assessment  List",
      link: "assessmentlist",
    },
  ];

  return (
    <>
      <Box>
        <SMDashboard menuItems={pages} dashboardName="Institute Dashboard">
          <Routes>
            <Route path="/instituteprofile" element={<InstituteProfile />} />
            <Route path="/studentlist" element={<StudentList />} />
            <Route path="/studentlist/:id" element={<StudentDetail />} />
            <Route path="/courselist" element={<CourseList />} />
            <Route path="/assessmentlist" element={<AssessmentList />} />
            <Route path="/quizlist" element={<QuizList />} />
            {/* <Route path="*" element={<NotFound/>} /> */}
          </Routes>
        </SMDashboard>
      </Box>
    </>
  );
}
