import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./Questions.css";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import arrow from "../../images/arrow.svg";
import { AppContext } from "../../context/AppContext";

/**
 * Renders a question component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.question - The question object.
 * @param {number} props.questionId - The ID of the question.
 * @param {number} props.allQuestions - The total number of questions.
 * @returns {JSX.Element} The rendered question component.
 */
export default function Questions({ question, questionId, allQuestions }) {
  const { selectedAnswers, setContext } = useContext(AppContext);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (
      selectedAnswers &&
      selectedAnswers[questionId - 1] !== undefined &&
      selectedAnswers[questionId - 1] !== null
    ) {
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
    if (!selectedAnswer || !question.answers.includes(selectedAnswer)) {
      setErrorMessage("Please select an answer before moving on.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }
    if (questionId === allQuestions) {
      navigate("/results");
      setErrorMessage(null);
    } else {
      navigate(`/quiz/${questionId + 1}`);
      setErrorMessage(null);
    }
  };

  return (
    <div id="main-questions-container">
      <div id="main-title-progress-container">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
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
