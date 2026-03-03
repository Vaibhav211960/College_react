import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    return (
        <div>
            {/* Navigation Bar */}
            <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
                <h1 className="text-xl font-semibold tracking-wide">
                    QuizLet
                </h1>
                <div className="space-x-6 text-sm">
                    <button onClick={() => navigate("/login")} className="hover:text-gray-300">
                        login
                    </button>
                    <button onClick={() => navigate("/quiz")} className="hover:text-gray-300">
                        Quiz
                    </button>
                    <button onClick={() => navigate("/dashboard")} className="hover:text-gray-300">
                        Dashboard
                    </button>
                    <button onClick={() => navigate("/history")} className="hover:text-gray-300">
                        history
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center px-6 py-24 bg-gray-100">
                <h2 className="text-4xl font-bold mb-6">
                    Test Your Knowledge.
                </h2>
                <p className="text-gray-700 max-w-xl mb-8">
                    Practice quizzes across different domains, improve your skills,
                    and track your performance over time.
                </p>
                <button
                    onClick={() => navigate("/categories")}
                    className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
                >
                    Explore Categories
                </button>
            </section>

            {/* Categories Section */}
            <section className="px-8 py-16 bg-white">
                <h3 className="text-2xl font-semibold text-center mb-10">
                    Quiz Categories
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

                    <div
                        onClick={() => navigate("/quiz/react")}
                        className="border border-gray-300 p-6 rounded-md hover:shadow-md cursor-pointer transition"
                    >
                        <h4 className="text-lg font-semibold mb-2">React</h4>
                        <p className="text-gray-600 text-sm">
                            Test your knowledge of components, hooks, routing and more.
                        </p>
                    </div>

                    <div
                        onClick={() => navigate("/quiz/dsa")}
                        className="border border-gray-300 p-6 rounded-md hover:shadow-md cursor-pointer transition"
                    >
                        <h4 className="text-lg font-semibold mb-2">DSA</h4>
                        <p className="text-gray-600 text-sm">
                            Practice data structures and algorithm-based questions.
                        </p>
                    </div>

                    <div
                        onClick={() => navigate("/quiz/html")}
                        className="border border-gray-300 p-6 rounded-md hover:shadow-md cursor-pointer transition"
                    >
                        <h4 className="text-lg font-semibold mb-2">HTML</h4>
                        <p className="text-gray-600 text-sm">
                            Prepare for common HTML interview questions.
                        </p>
                    </div>

                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-white text-center py-4 text-sm">
                © 2026 Quiz Let. All rights reserved.
            </footer>

        </div>

    );
};

export default Home;
