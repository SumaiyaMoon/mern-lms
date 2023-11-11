import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import SMButton from "../../../../../components/SMButton";
import { useNavigate } from "react-router-dom";
import SMTableContainer from "../../../../../components/table/SMTableContainer";
import SMTableRow from "../../../../../components/table/SMTableRow";
import { fbGet } from "../../../../../config/firebase/firebase-methods";

export default function InstituteList() {
  const [studentList, setStudentList] = useState<any[]>([]);

  const getStudent = () => {
    fbGet("users")
      .then((res: any) => {
        console.log(res);
        setStudentList([...res]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStudent();
  }, []);

  const navigate = useNavigate();

  return (
    <Box className="d-flex align-items-center justify-content-center flex-column">
      <div>
        <div className="d-flex align-items-center justify-content-between py-2">
          <p className="m-2 fw-bold">Institute List</p>
          <SMButton
            label="Add Student"
            onClick={() => {
              navigate("/studentreg");
            }}
          />
        </div>
        <div className="d-flex align-items-center justify-content-around">
          <SMTableContainer
            cols={[
              {
                heading: "Id",
                key: "id",
              },
              {
                heading: "Name",
                key: "studentName",
              },
              {
                heading: "Email",
                key: "email",
              },
              {
                heading: "Active",
                key: "isActive",
              },
            ]}
          >
            {studentList && studentList.length > 0
              ? studentList
                  .filter(
                    (student) =>
                      student.role && student.role.toLowerCase() === "student"
                  )
                  .map((student: any, i: number) => (
                    <SMTableRow
                      keyIndex={i}
                      Id={i + 1}
                      Name={student.studentName || "N/A"}
                      Email={student.email || "N/A"}
                      Active={student.isActive ? "Yes" : "No"}
                      onClick={() => {
                        navigate(`${student.id}`);
                      }}
                    />
                  ))
              : null}
          </SMTableContainer>
        </div>
      </div>
    </Box>
  );
}
