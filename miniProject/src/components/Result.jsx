import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, topic } = location.state || { score: 0, total: 0, topic: "Unknown" };

  const percentage = Math.round((score / total) * 100);

  const getMessage = () => {
    if (percentage === 100) return "Perfect score!";
    if (percentage >= 80)  return "Great job!";
    if (percentage >= 60)  return "Good effort!";
    return "Keep practicing!";
  };

  return (
    <div className="fixed top-[60px] left-0 w-full h-full bg-black text-white flex items-center justify-center px-10">
      <div className="w-full max-w-md">

        {/* Header */}
        <p className="text-gray-500 text-sm mb-2">Quiz Complete</p>
        <h2 className="text-3xl font-bold text-white mb-8">{topic}</h2>

        {/* Score Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-6 text-center">
          <p className="text-gray-500 text-sm mb-3">Your Score</p>
          <div className="text-7xl font-bold text-white mb-2">
            {score}<span className="text-3xl text-gray-600">/{total}</span>
          </div>
          <div className="text-lg font-semibold text-gray-400 mb-4">{percentage}%</div>
          <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-700"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-gray-300 font-medium mt-5">{getMessage()}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/categories")}
            className="w-full bg-white text-black font-semibold py-3 rounded hover:bg-gray-200 transition-colors text-sm"
          >
            Try Another Topic
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-900 text-white font-semibold py-3 rounded hover:bg-gray-800 border border-gray-800 transition-colors text-sm"
          >
            Back to Home
          </button>
        </div>

        <p className="text-center text-gray-700 text-xs mt-8">© 2026 QuizLet</p>

      </div>
    </div>
  );
};

export default Result;