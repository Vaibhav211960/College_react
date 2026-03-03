import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from "./componants/Home.jsx"
import Category from "./componants/Category.jsx"
import QuizHtml from "./componants/QuizHtml.jsx"
import QuizReact from "./componants/QuizReact.jsx"
import QuizCss from "./componants/QuizCss.jsx"
import Login from "./componants/Login.jsx"
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/categories' element={<Category />} />
          <Route path='/login' element={<Login />} />
          <Route path='/quiz/html' element={<QuizHtml />} />
          <Route path='/quiz/react' element={<QuizReact />} />
          <Route path='/quiz/css' element={<QuizCss />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
