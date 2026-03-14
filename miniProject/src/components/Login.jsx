import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const user = { name: "vivek123", password: "qwertyuiop" };

const handleSubmit = (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const pass = e.target.pass.value;
  if (name === user.name && pass === user.password) {
  setError("");
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("username", name);
  window.dispatchEvent(new Event("authChange")); // ← add this
  alert("Login successful!");
  navigate("/");
} else {
    setError("Incorrect username or password. Please try again.");
  }
};

  return (
    <div className="fixed top-[60px] left-0 w-full h-full bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <span className="text-black text-sm font-bold">Q</span>
          </div>
          <span className="text-white font-bold text-lg">QuizLet</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-white mb-1">Sign In</h2>
        <p className="text-gray-500 text-sm mb-8">Enter your details to continue.</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Username</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your username"
              className="bg-gray-900 border border-gray-700 focus:border-white text-white placeholder-gray-600 rounded px-4 py-3 text-sm outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              name="pass"
              required
              placeholder="Enter your password"
              className="bg-gray-900 border border-gray-700 focus:border-white text-white placeholder-gray-600 rounded px-4 py-3 text-sm outline-none transition-colors"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="bg-white text-black font-semibold py-3 rounded hover:bg-gray-200 transition-colors text-sm mt-1"
          >
            Sign In
          </button>

        </form>

        <button
          onClick={() => navigate("/")}
          className="mt-6 text-gray-600 hover:text-gray-400 text-sm transition-colors"
        >
          ← Back to Home
        </button>

      </div>
    </div>
  );
};

export default Login;