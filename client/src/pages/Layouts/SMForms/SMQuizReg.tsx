import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { fbAdd, fbGet } from "../../../config/firebase/firebase-methods";
import SMButton from "../../../components/SMButton";
import SMInput from "../../../components/SMInput";

export default function SMQuizReg() {
  const navigate = useNavigate(); //navigation
  const [model, setModel] = useState<any>({}); // complete quiz model
  const [isDisabled, setIsDisabled] = useState(false); //lock unlock
  const [quizList, setQuizList] = useState<any>({}); //list of quizes in sidebar
  const [quizQuestions, setQuizQuestions] = useState<any>([]);
  const [question, setQuestion] = useState<any>(""); // a question
  const [option, setOption] = useState<any>(""); //setting option
  const [optionsList, setOptionsList] = useState<any>([]); //options list of a question
  const [correctOption, setCorrectOption] = useState<any>(); // setting correct option from options list of a question
  const [questionModel, setQuestionModel] = useState<any>({}); //  question, correctanswer, optionsList

  const fillModel = (key: string, val: string) => {
    //filling complete model
    model[key] = val;
    setModel({ ...model });
  };

  const fillQuestionModel = (key: string, val: string) => {
    //filling complete QuestionModel
    questionModel[key] = val;
    setQuestionModel({ ...questionModel });
  };

  let SaveQuiz = () => {
    //adding quiz in database
    console.log(model);
    fbAdd("quizzes", model)
      .then((res) => {
        console.log(res);
        setModel({});
        setQuestion("");
        setOptionsList([]);
        setCorrectOption("");
        setQuestionModel({});
        setQuizQuestions([]);
        getQuiz();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getQuiz = () => {
    //getting quizList from  database
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
    //used to run function getQuiz()
    getQuiz();
  }, []);

  let LockQuiz = () => {
    //lock unlock
    setIsDisabled(!isDisabled);
  };

  let AddOptionsList = () => {
    // Use the previous state to ensure you're updating correctly
    setOptionsList((prevOptionsList: any) => {
      const updatedOptionsList = [...prevOptionsList, option];
      // console.log(updatedOptionsList); // Log the updated state

      return updatedOptionsList;
    });

    setOption("");
  };

  let LogOut = () => {
    //logging out
    navigate("/");
  };

  let AddQuizQuestioninModel = () => {
    questionModel.question = question;
    questionModel.options = [...optionsList];
    questionModel.answer = correctOption;
    console.log(questionModel);
    setQuestionModel({
      ...questionModel,
    });
    setQuizQuestions([...quizQuestions, questionModel]);
    model.quiz = quizQuestions;
    setQuestion("");
    setOptionsList([]);
    setCorrectOption("");
  };

  return (
    <Box>
      <Box
        className="bg_img_login container-fluid"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper
          className="paperColor m-2 p-2"
          elevation={3}
          sx={{ maxWidth: "100%", width: "100%" }}
        >
          <div>
            <div className="row">
              <div className="col-6 text-start">Quiz Form</div>
              <div className="col-6 text-end">
                <SMButton label="Save Quiz" onClick={SaveQuiz} />
              </div>
            </div>
            <div className="row m-2 p-2">
              <div className="col-3 m-2 ">
                <SMInput
                  value={model.quizname || " "}
                  onChange={(e: any) => fillModel("quizname", e.target.value)}
                  name="option"
                  label="Quiz Name"
                  type="text"
                  disabled={isDisabled}
                />
              </div>
              <div className="col-3 m-2 ">
                <SMInput
                  value={model.duration || " "}
                  onChange={(e: any) => fillModel("duration", e.target.value)}
                  name="option"
                  label="Quiz Duration in minutes"
                  type="text"
                  disabled={isDisabled}
                />
              </div>
              <div className="col-3 m-2 ">
                <SMInput
                  value={model.secretkey || " "}
                  onChange={(e: any) => fillModel("secretkey", e.target.value)}
                  name="option"
                  label="Secret Key"
                  type="text"
                  disabled={isDisabled}
                />
              </div>

              <div className="col-3 m-2 ">
                <SMInput
                  value={model.isOpen || " "}
                  onChange={(e: any) => fillModel("isOpen", e.target.value)}
                  name="option"
                  label="Quiz Open"
                  type="text"
                  disabled={isDisabled}
                />
              </div>
              <div className="col-6 m-2 ">
                <SMInput
                  value={model.description || " "}
                  onChange={(e: any) =>
                    fillModel("description", e.target.value)
                  }
                  name="option"
                  label="Description"
                  type="text"
                  disabled={isDisabled}
                />
              </div>
            </div>
            <div>
              <SMButton
                className="p-2"
                onClick={LockQuiz}
                label={isDisabled ? "Unlock Quiz" : "Lock Quiz"}
              />
            </div>
            <div>
              <SMInput
                value={question}
                className="p-2 m-2"
                onChange={(e: any) => setQuestion(e.target.value)} // Make sure onChange is set to update the state
                name="question"
                label="Question"
                type="text"
                disabled={!isDisabled} // Check if isDisabled is set to true
              />
            </div>
            <div className="row">
              <div className="col-8">
                <SMInput
                  value={option}
                  className="p-2 m-2"
                  onChange={(e: any) => setOption(e.target.value)} // Make sure onChange is set to update the state
                  name="option"
                  label="Options Here"
                  type="text"
                  disabled={!isDisabled} // Check if isDisabled is set to true
                />
              </div>
              <div className="col-2 text-center mt-3">
                <SMButton label="Add" onClick={AddOptionsList} />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <ul id="RenderList" className="list-unstyled">
                  {optionsList.map((option: any, index: any) => (
                    <li
                      key={index} // Provide a unique key
                      onClick={() => setCorrectOption(option)}
                      className="m-2 p-2 border bg-info-subtle"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-3 m-5">
                {correctOption && (
                  <TextField
                    fullWidth={true}
                    id="outlined-disabled"
                    disabled
                    label="Correct Option"
                    variant="outlined"
                    value={correctOption} // Set the value to questionModel.answer, or an empty string if it's not available
                    onChange={(e: any) => {
                      fillQuestionModel("answer", e.target.value);
                    }}
                  />
                )}
              </div>
            </div>
            <div>
              <button
                className="btn btn-info p-2"
                onClick={() => {
                  AddQuizQuestioninModel();
                }}
              >
                Add Question
              </button>
            </div>

            <div>
              <div>
                {/* Render questions from quizQuestions array */}
                {quizQuestions &&
                  quizQuestions.length > 0 &&
                  quizQuestions.map((questionData: any, index: any) => (
                    <Paper key={index}>
                      <h4>
                        Question {index + 1}: {questionData.question}
                      </h4>
                      <p>Options:</p>
                      <ul>
                        {questionData.options.map(
                          (option: any, optionIndex: any) => (
                            <li key={optionIndex}>{option}</li>
                          )
                        )}
                      </ul>
                      <p>Correct Answer: {questionData.answer}</p>
                    </Paper>
                  ))}
              </div>
            </div>
          </div>
        </Paper>
      </Box>
    </Box>
  );
}
