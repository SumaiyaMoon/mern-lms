import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fbGet,
  fbGetByID,
} from "../../../../../config/firebase/firebase-methods";

export default function StudentDetail() {
  const [studentDetail, setStudentDetail] = useState<any>({});
  const { id } = useParams();

  const getStudent = () => {
    fbGetByID("users", `${id}`)
      .then((res: any) => {
        console.log(res);

        setStudentDetail({ ...res });
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  useEffect(() => {
    getStudent();
  }, []);

  return (
    <>
      <Box>
        <div key={id}>
          <h1>Student Name: {studentDetail.studentName}</h1>
          <p>Student Email: {studentDetail.email}</p>
          <p>Student Id: {studentDetail.id}</p>
          <p>Student CNIC: {studentDetail.cnic}</p>
          <p>
            Student Status: {studentDetail.isActive ? "Active" : "Not Active"}
          </p>
        </div>
      </Box>
    </>
  );
}
