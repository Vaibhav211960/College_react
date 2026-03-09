import React from "react";
import QuizLayout from "./QuizLayout";

const questions = [
  {
    question: "Which hook is used to manage complex state logic?",
    options: ["useState", "useReducer", "useContext", "useEffect"],
    answer: "useReducer",
  },
  {
    question: "What does React.memo() do?",
    options: [
      "Saves data to local storage",
      "Stops a component from re-rendering when props haven't changed",
      "Creates a new state variable",
      "Handles API calls",
    ],
    answer: "Stops a component from re-rendering when props haven't changed",
  },
  {
    question: "How do you send data from a parent to a child component?",
    options: ["Using State", "Using Props", "Using Hooks", "Using Redux"],
    answer: "Using Props",
  },
  {
    question: "Which class lifecycle method does useEffect replace?",
    options: ["componentDidMount", "render", "getInitialState", "componentWillUnmount"],
    answer: "componentDidMount",
  },
  {
    question: "What does the useRef hook return?",
    options: ["A state value", "A function", "A mutable ref object", "A boolean"],
    answer: "A mutable ref object",
  },
];

const QuizReact = () => (
  <QuizLayout topic="React.js" subtitle="Advanced" questions={questions} />
);

export default QuizReact;