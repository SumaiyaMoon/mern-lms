import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import SMButton from "../../../../../components/SMButton";
import { useNavigate } from "react-router-dom";
import { fbGet } from "../../../../../config/firebase/firebase-methods";
import SMTableContainer from "../../../../../components/table/SMTableContainer";
import SMTableRow from "../../../../../components/table/SMTableRow";

export default function QuizList() {
  const [quizList, setQuizList] = useState<any[]>([]);

  const getquiz = () => {
    fbGet("quizzes")
      .then((res: any) => {
        console.log(res);
        setQuizList([...res]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getquiz();
  }, []);

  const navigate = useNavigate();

  return (
    <Box className="d-flex align-items-center justify-content-center flex-column">
      <div>
        <div className="d-flex align-items-center justify-content-between py-2">
          <p className="m-2 fw-bold">Quiz List</p>
          <SMButton label="Add Quiz" onClick={() => navigate("/quizreg")} />
        </div>
        <div className="d-flex align-items-center justify-content-around">
          <SMTableContainer
            cols={[
              {
                heading: "Id",
                key: "id",
              },
              {
                heading: "Quiz",
                key: "quizname",
              },
              {
                heading: "Duration (min)",
                key: "duration",
              },
              {
                heading: "status",
                key: "isOpen",
              },
            ]}
          >
            {quizList && quizList.length > 0
              ? quizList.map((quiz: any, i: number) => (
                  <SMTableRow
                    keyIndex={i}
                    Id={i + 1}
                    Name={quiz.quizname || "N/A"}
                    Email={quiz.duration}
                    Active={quiz.isOpen || "N/A"}
                  />
                ))
              : null}
          </SMTableContainer>
        </div>
      </div>
    </Box>
  );
}
