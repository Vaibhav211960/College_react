import React from "react";
import { useNavigate } from "react-router-dom";

const QuizReact = () =>{
        const navigate = useNavigate();
    
        const questions = [
            {
                question: "What is React primarily used for?",
                options: [
                    "Building user interfaces",
                    "Database management",
                    "Server configuration",
                    "Machine learning"
                ],
                answer: "Building user interfaces"
            },
            {
                question: "Which hook is used for managing state?",
                options: ["useEffect", "useState", "useContext", "useRef"],
                answer: "useState"
            },
            {
                question: "What is JSX?",
                options: [
                    "A JavaScript XML syntax extension",
                    "A database",
                    "A CSS framework",
                    "A backend language"
                ],
                answer: "A JavaScript XML syntax extension"
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

export default QuizReact