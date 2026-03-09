import React from "react";
import QuizLayout from "./QuizLayout";

const questions = [
  {
    question: "What is the main way MongoDB stores data?",
    options: ["Tables", "Documents", "Rows", "Key-Value Pairs"],
    answer: "Documents",
  },
  {
    question: "What does BSON stand for?",
    options: [
      "Basic Standard Object Notation",
      "Binary JSON",
      "Browser Serialized Object Nodes",
      "Binary Standard Object Network",
    ],
    answer: "Binary JSON",
  },
  {
    question: "Which command inserts one document into a collection?",
    options: [
      "db.collection.add()",
      "db.collection.insert()",
      "db.collection.insertOne()",
      "db.collection.push()",
    ],
    answer: "db.collection.insertOne()",
  },
  {
    question: "What is the default unique identifier field in MongoDB?",
    options: ["_id", "uid", "pk", "entry_id"],
    answer: "_id",
  },
  {
    question: "Which method returns all documents in a collection?",
    options: [
      "db.collection.get()",
      "db.collection.find()",
      "db.collection.search()",
      "db.collection.list()",
    ],
    answer: "db.collection.find()",
  },
];

const QuizMongodb = () => (
  <QuizLayout topic="MongoDB" subtitle="Advanced" questions={questions} />
);

export default QuizMongodb;