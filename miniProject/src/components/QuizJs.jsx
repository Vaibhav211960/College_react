import React from "react";
import QuizLayout from "./QuizLayout";

const questions = [
  {
    question: "Which of these is NOT a primitive data type in JavaScript?",
    options: ["String", "Number", "Boolean", "Object"],
    answer: "Object",
  },
  {
    question: "What is the result of '2' + 2 in JavaScript?",
    options: ["4", "'22'", "NaN", "Error"],
    answer: "'22'",
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["shift()", "pop()", "push()", "unshift()"],
    answer: "push()",
  },
  {
    question: "What does the 'typeof' operator do?",
    options: [
      "Checks if a variable is defined",
      "Returns the data type of a value",
      "Creates a new class",
      "Converts a string to a number",
    ],
    answer: "Returns the data type of a value",
  },
  {
    question: "Which keyword declares a variable that cannot be reassigned?",
    options: ["var", "let", "const", "static"],
    answer: "const",
  },
];

const QuizJs = () => (
  <QuizLayout topic="JavaScript" subtitle="Core Language" questions={questions} />
);

export default QuizJs;