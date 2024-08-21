import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./Questions.css";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import arrow from "../../images/arrow.svg";
import { AppContext } from "../../context/AppContext";

export default function Questions({ question, questionId, allQuestions }) {
  const { selectedAnswers, setContext } = useContext(AppContext);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedAnswers && selectedAnswers[questionId - 1] !== undefined && selectedAnswers[questionId - 1] !== null) {
        setSelectedAnswer(selectedAnswers[questionId - 1]);
    }
}, [selectedAnswers, questionId]);

  useEffect(() => {
    const newAnswers = selectedAnswers ? [...selectedAnswers] : [];
    newAnswers[questionId - 1] = selectedAnswer;

    setContext((prev) => ({
        ...prev,
        selectedAnswers: newAnswers.filter((answer) => answer !== null),
    }));
  }, [selectedAnswer]);

  const selectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const goToNextPage = () => {
    // Add message to user that he needs to select an answer
    if (!selectedAnswer) {
        return;
    }
    if (questionId === allQuestions) {
        navigate("/results");
      } else {
        navigate(`/quiz/${questionId + 1}`);
      }
  };

  return (
    <div id="main-questions-container">
      <div id="main-title-progress-container">
        <div id="title-progress-container">
          <h6>{question.title}</h6>
          <ProgressBar
            questionNumber={questionId}
            allQuestions={allQuestions}
          />
        </div>
      </div>
      <div id="answers-container">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => selectAnswer(answer)}
            className={selectedAnswer === answer ? "selected" : undefined}
          >
            {String.fromCharCode(97 + index)}. {answer}
          </button>
        ))}
      </div>
      <div id="prev-next-buttons">
        <NavLink to={questionId === 1 ? "/" : `/quiz/${questionId - 1}`}>
          Back
        </NavLink>
        <button onClick={() => goToNextPage()}>
          {questionId === allQuestions
            ? "Discover your results"
            : "Next Question"}
          {questionId !== allQuestions && (
            <img src={arrow} alt="next-page-arrow" />
          )}
        </button>
      </div>
    </div>
  );
}

Questions.propTypes = {
  question: PropTypes.object.isRequired,
  questionId: PropTypes.number.isRequired,
  allQuestions: PropTypes.number.isRequired,
};
