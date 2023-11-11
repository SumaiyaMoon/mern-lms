import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Protected from "./protected";
import Home from "../../pages/Home";
import NotFound from "../../pages/NotFound";
import SMSignUp from "../../pages/Layouts/SMSignup";
import SMLogin from "../../pages/Layouts/SMLogin";
import AdminDashboard from "../../pages/LMS/Admin/AdminDashboard";
import InstituteDashboard from "../../pages/LMS/Institute/InstituteDashboard";
import StudentDashboard from "../../pages/LMS/Students/StudentDashboard";
import SMStudentReg from "../../pages/Layouts/SMForms/SMStudentReg";
import SMTeacherReg from "../../pages/Layouts/SMForms/SMTeacherReg";
import SMInstituteReg from "../../pages/Layouts/SMForms/SMInstituteReg";
import SMCourseReg from "../../pages/Layouts/SMForms/SMCourseReg";
import SMQuizReg from "../../pages/Layouts/SMForms/SMQuizReg";
import SMAssessmentReg from "../../pages/Layouts/SMForms/SMAssessmentReg";



export default function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
           <Route path="/" element={<Home/>} />
           <Route path="*" element={<NotFound/>} />
           <Route path="signup" element={<SMSignUp/>} />
           <Route path="login" element={<SMLogin/>} />
           {/* Reg Forms */}
           <Route path="/studentreg" element={<SMStudentReg/>} />
           <Route path="/teacherreg" element={<SMTeacherReg/>} />
           <Route path="/institutereg" element={<SMInstituteReg/>} />
           <Route path="/coursereg" element={<SMCourseReg/>} />
           <Route path="/quizreg" element={<SMQuizReg/>} />
           <Route path="/assessmentreg" element={<SMAssessmentReg/>} />
           {/* Protected Routes */}
           <Route path="admindashboard/*" element={<Protected Screen={AdminDashboard} />} />
           <Route path="institutedashboard/*" element={<Protected Screen={InstituteDashboard} />} />
           <Route path="studentdashboard/*" element={<Protected Screen={StudentDashboard} />} />
        </Routes>
      </Router>
    </>
  );
}
