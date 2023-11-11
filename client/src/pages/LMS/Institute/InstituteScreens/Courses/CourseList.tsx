import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import SMButton from "../../../../../components/SMButton";
import { useNavigate } from "react-router-dom";
import { fbGet } from "../../../../../config/firebase/firebase-methods";
import SMTableContainer from "../../../../../components/table/SMTableContainer";
import SMTableRow from "../../../../../components/table/SMTableRow";

export default function CourseList() {
  const [courseList, setCourseList] = useState<any[]>([]);

  const getCourse = () => {
    fbGet("courses")
      .then((res: any) => {
        console.log(res);
        setCourseList([...res]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCourse();
  }, []);

  const navigate = useNavigate();

  return (
    <Box className="d-flex align-items-center justify-content-center flex-column">
      <div>
        <div className="d-flex align-items-center justify-content-between py-2">
          <p className="m-2 fw-bold">Course List</p>
          <SMButton label="Add Course" onClick={() => navigate("/coursereg")} />
        </div>
        <div className="d-flex align-items-center justify-content-around">
          <SMTableContainer
            cols={[
              {
                heading: "Id",
                key: "id",
              },
              {
                heading: "Course",
                key: "courseName",
              },
              {
                heading: "Duration (weeks)",
                key: "courseDuration",
              },
              {
                heading: "Teacher",
                key: "courseTeacher",
              },
            ]}
          >
            {courseList && courseList.length > 0
              ? courseList.map((course: any, i: number) => (
                  <SMTableRow
                    keyIndex={i}
                    Id={i + 1}
                    Name={course.courseName || "N/A"}
                    Email={course.courseDuration}
                    Active={course.courseTeacher || "N/A"}
                  />
                ))
              : null}
          </SMTableContainer>
        </div>
      </div>
    </Box>
  );
}
