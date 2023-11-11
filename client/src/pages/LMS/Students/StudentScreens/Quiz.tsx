import { useEffect, useState } from "react";
import { fbGet } from "../../../../config/firebase/firebase-methods";
import {
  Button,
  Typography,
  CssBaseline,
  Container,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";

export default function Quiz() {
  const [questionList, setquestionList] = useState<any[]>([]); // rendering questions of quiz
  const [isActive, setisActive] = useState<boolean>(true); // checking model.isOpen ?
  const [marks, setMarks] = useState<number>(0); // result
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const { id } = useParams(); // Access the 'id' from the URL

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const getQuiz = () => {
    fbGet("quizzes")
      .then((res: any) => {
        console.log(res);
        if (Array.isArray(res)) {
          setquestionList([...res]);
        } else {
          console.error("Quiz data is not an array.");
        }
      })
      .catch((err) => {
        console.error("Error fetching quiz data:", err);
      });
  };
  const quiz = questionList.find((quiz) => quiz.id === id); // Find the quiz based on 'id'

  const SubmitQuiz = () => {
    if (!quiz) {
      alert("Quiz not found.");
      return;
    }

    const key = prompt("Enter Secret Key to Submit Quiz", "XXXX");

    if (key !== null) {
      console.log("Entered Key:", key);
      console.log("Quiz Secret Key:", quiz.secretkey);

      if (key.trim() === quiz.secretkey.trim()) {
        alert("Quiz Submitted");
      } else {
        alert("Invalid Secret Key. Please try again.");
      }
    } else {
      alert("Operation canceled.");
    }
  };
  useEffect(() => {
    getQuiz();
  }, []);

  if (isActive === true) {
    // Filter the questions for the specific quiz based on 'id'
    const selectedQuiz = questionList.find((quiz) => quiz.id === id);

    if (selectedQuiz) {
      return (
        <div>
          <h1 className="text-center fst-italic my-2">
            {selectedQuiz.quizname}
          </h1>
          {selectedQuiz.quiz.map((question: any, i: number) => (
            <div key={i}>
              <CssBaseline />
              <Container maxWidth="md">
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={12} sm={12}>
                      <Item className="bg-info shadow-lg rounded border border-1 border-dark my-3">
                        <Typography
                          variant="body2"
                          gutterBottom
                          className="p-2 text-start"
                        >
                          {[i + 1]} : {question.question}
                        </Typography>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </Container>

              <CssBaseline />
              <Container maxWidth="md">
                <Box>
                  <Grid container spacing={2}>
                    {question.options.map((option: string, index: number) => (
                      <Grid key={index} item xs={12} md={6} lg={6} sm={12}>
                        <Item className="bg-light shadow-sm border border-dark border-1 rounded">
                          <Button
                            fullWidth={true}
                            sx={{ textTransform: "none" }}
                            className="text-body-secondary"
                          >
                            {option.toLowerCase()}
                          </Button>
                        </Item>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Container>
            </div>
          ))}
          <Button className="btn btn-info" onClick={SubmitQuiz}>
            Submit Quiz
          </Button>
        </div>
      );
    } else {
      return <h1>Quiz not found.</h1>;
    }
  } else {
    return <h1>Quiz not Launched yet.</h1>;
  }
}
