import PropTypes from "prop-types";
import "./ProgressBar.css";

export default function ProgressBar({ questionNumber, allQuestions }) {
  const radius = 40;
  const progress = (questionNumber / allQuestions) * 100;
  const circumference = radius * 2 * Math.PI;

  return (
      <svg height="100" width="100">
        <circle
          id="inner-circle"
          stroke="#EEF7FB"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          id="outer-circle"
          stroke="#AADDF3"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress / 100)}
          r={radius}
          cx="50"
          cy="50"
        />
        <text x="50" y="50" textAnchor="middle" dominantBaseline="middle">{questionNumber} / {allQuestions}</text>
      </svg>
  );
}

ProgressBar.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  allQuestions: PropTypes.number.isRequired,
};
