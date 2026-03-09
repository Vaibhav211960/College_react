import React from "react";
import QuizLayout from "./QuizLayout";

const questions = [
  {
    question: "Which property controls the spacing between lines of text?",
    options: ["letter-spacing", "line-height", "text-spacing", "word-spacing"],
    answer: "line-height",
  },
  {
    question: "How do you select an element with the id 'header'?",
    options: [".header", "header", "#header", "*header"],
    answer: "#header",
  },
  {
    question: "Which property creates space between content and the border?",
    options: ["margin", "border", "padding", "outline"],
    answer: "padding",
  },
  {
    question: "In Flexbox, which property aligns items along the main axis?",
    options: ["align-items", "justify-content", "align-content", "flex-direction"],
    answer: "justify-content",
  },
  {
    question: "Which unit is relative to the font-size of the root element?",
    options: ["em", "px", "rem", "vh"],
    answer: "rem",
  },
];

const QuizCss = () => (
  <QuizLayout topic="CSS" subtitle="Beginner" questions={questions} />
);

export default QuizCss;