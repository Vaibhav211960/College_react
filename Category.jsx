import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "HTML", path: "/quiz/html", desc: "Prepare for common HTML interview questions." },
  { name: "React", path: "/quiz/react", desc: "Master React concepts and interview questions." },
  { name: "CSS", path: "/quiz/css", desc: "Practice important CSS interview questions." },
  { name: "JavaScript", path: "/quiz/js", desc: "Sharpen your JavaScript fundamentals." },
  { name: "Node.js", path: "/quiz/node", desc: "Backend and Node.js interview prep." },
  { name: "MongoDB", path: "/quiz/mongodb", desc: "Database concepts and questions." },
];

const Category = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => navigate(cat.path)}
            className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <h4 className="text-xl font-semibold mb-2 text-gray-800">
              {cat.name}
            </h4>
            <p className="text-gray-600 text-sm">
              {cat.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;