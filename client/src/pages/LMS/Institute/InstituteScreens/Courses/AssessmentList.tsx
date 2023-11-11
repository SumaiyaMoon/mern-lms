import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import SMButton from "../../../../../components/SMButton";
import { useNavigate } from "react-router-dom";
import { fbGet } from "../../../../../config/firebase/firebase-methods";
import SMTableContainer from "../../../../../components/table/SMTableContainer";
import SMTableRow from "../../../../../components/table/SMTableRow";

export default function AssessmentList() {
  const [assessmentList, setAssessmentList] = useState<any[]>([]);

  const getAssessment = () => {
    fbGet("assessments")
      .then((res: any) => {
        console.log(res);
        setAssessmentList([...res]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAssessment();
  }, []);

  const navigate = useNavigate();

  return (
    <Box className="d-flex align-items-center justify-content-center flex-column">
      <div>
        <div className="d-flex align-items-center justify-content-between py-2">
          <p className="m-2 fw-bold">assessment List</p>
          <SMButton
            label="Add assessment"
            onClick={() => navigate("/assessmentreg")}
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
                heading: "assessment",
                key: "assessmentName",
              },
              {
                heading: "Duration (weeks)",
                key: "assessmentDuration",
              },
              {
                heading: "Course",
                key: "assessmentTeacher",
              },
            ]}
          >
            {assessmentList && assessmentList.length > 0
              ? assessmentList.map((assessment: any, i: number) => (
                  <SMTableRow
                    keyIndex={i}
                    Id={i + 1}
                    Name={assessment.assessmentName || "N/A"}
                    Email={assessment.assessmentDuration}
                    Active={assessment.assessmentCourse || "N/A"}
                  />
                ))
              : null}
          </SMTableContainer>
        </div>
      </div>
    </Box>
  );
}
