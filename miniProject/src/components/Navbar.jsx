import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-black border-b border-gray-800">
      <div className="w-full px-10 h-16 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <span className="text-black text-sm font-bold">Q</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">QuizLet</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          <Link to="/categories" className="text-gray-400 hover:text-white text-sm transition-colors">
            Topics
          </Link>
          <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">
            Home
          </Link>
          <Link to="/profile" className="text-gray-400 hover:text-white text-sm transition-colors">
            Profile
          </Link>
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-black text-sm font-semibold px-5 py-2 rounded hover:bg-gray-200 transition-colors"
          >
            Sign In
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;