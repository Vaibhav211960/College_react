import React from "react";
import QuizLayout from "./QuizLayout";

const questions = [
  {
    question: "Which tool manages packages in Node.js?",
    options: ["npm", "pip", "composer", "git"],
    answer: "npm",
  },
  {
    question: "Which global object gives access to environment variables?",
    options: ["window", "global", "process", "env"],
    answer: "process",
  },
  {
    question: "What is the default scope of a variable inside a Node.js module?",
    options: ["Global", "Local to the module", "Shared across all files", "Undefined"],
    answer: "Local to the module",
  },
  {
    question: "Which built-in module handles file paths?",
    options: ["fs", "path", "url", "os"],
    answer: "path",
  },
  {
    question: "Node.js runs on top of which JavaScript engine?",
    options: ["SpiderMonkey", "Chakra", "V8", "JavaScriptCore"],
    answer: "V8",
  },
];

const QuizNode = () => (
  <QuizLayout topic="Node.js" subtitle="Advanced" questions={questions} />
);

export default QuizNode;