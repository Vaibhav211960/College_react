import React from "react";
import QuizLayout from "./QuizLayout";

const questions = [
  {
    question: "Which HTML5 element is used for a page footer?",
    options: ["<bottom>", "<footer>", "<section>", "<aside>"],
    answer: "<footer>",
  },
  {
    question: "Which element creates the largest heading?",
    options: ["<heading>", "<h6>", "<h1>", "<head>"],
    answer: "<h1>",
  },
  {
    question: "Which attribute adds alternate text to an image?",
    options: ["title", "alt", "src", "longdesc"],
    answer: "alt",
  },
  {
    question: "Which character marks an end/closing tag?",
    options: ["*", "/", "<", "^"],
    answer: "/",
  },
  {
    question: "Which element marks text as important?",
    options: ["<important>", "<strong>", "<i>", "<mark>"],
    answer: "<strong>",
  },
];

const QuizHtml = () => (
  <QuizLayout topic="HTML" subtitle="Beginner" questions={questions} />
);

export default QuizHtml;