import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizHtml = () => {
    const navigate = useNavigate();

    const questions = [
        {
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "Home Tool Markup Language",
                "Hyperlinks and Text Mark Language",
                "Hyper Tool Multi Language"
            ],
            answer: "Hyper Text Markup Language"
        },
        {
            question: "Which tag is used to create a hyperlink?",
            options: ["<a>", "<link>", "<href>", "<hyper>"],
            answer: "<a>"
        },
        {
            question: "Which tag is used to insert an image?",
            options: ["<img>", "<image>", "<src>", "<pic>"],
            answer: "<img>"
        }
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const handleNext = () => {
        if (selected === questions[currentQuestion].answer) {
            setScore(score + 1);
        }

        const next = currentQuestion + 1;

        if (next < questions.length) {
            setCurrentQuestion(next);
            setSelected(null);
        } else {
            setShowResult(true);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-16 px-6">

            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                {!showResult ? (
                    <>
                        <h2 className="text-xl font-semibold mb-4">
                            Question {currentQuestion + 1} of {questions.length}
                        </h2>

                        <p className="mb-6 text-lg">
                            {questions[currentQuestion].question}
                        </p>

                        <div className="space-y-3">
                            {questions[currentQuestion].options.map((option, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelected(option)}
                                    className={`p-3 border rounded-md cursor-pointer transition ${
                                        selected === option
                                            ? "bg-black text-white"
                                            : "hover:bg-gray-200"
                                    }`}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={!selected}
                            className="mt-6 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </>
                ) : (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            Quiz Completed 🎉
                        </h2>
                        <p className="text-lg mb-6">
                            Your Score: {score} / {questions.length}
                        </p>

                        <button
                            onClick={() => navigate("/categories")}
                            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
                        >
                            Back to Categories
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizHtml;