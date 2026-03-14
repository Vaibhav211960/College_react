import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar      from "./components/Navbar";
import Home        from "./components/Home";
import Category    from "./components/Category";
import Login       from "./components/Login";
import Result      from "./components/Result";
import QuizHtml    from "./components/QuizHtml";
import QuizCss     from "./components/QuizCss";
import QuizJs      from "./components/QuizJs";
import QuizReact   from "./components/QuizReact";
import QuizNode    from "./components/QuizNode";
import QuizMongodb from "./components/QuizMongodb";
import Profile     from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/login"      element={<Login />} />
        <Route path="/profile"    element={<Profile />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/result"     element={<Result />} />
        <Route path="/quiz/html"    element={<ProtectedRoute><QuizHtml /></ProtectedRoute>} />
        <Route path="/quiz/css"     element={<ProtectedRoute><QuizCss /></ProtectedRoute>} />
        <Route path="/quiz/js"      element={<ProtectedRoute><QuizJs /></ProtectedRoute>} />
        <Route path="/quiz/react"   element={<ProtectedRoute><QuizReact /></ProtectedRoute>} />
        <Route path="/quiz/node"    element={<ProtectedRoute><QuizNode /></ProtectedRoute>} />
        <Route path="/quiz/mongodb" element={<ProtectedRoute><QuizMongodb /></ProtectedRoute>} />
        <Route path="*"           element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;