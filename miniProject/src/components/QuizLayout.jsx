import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizLayout = ({ topic, subtitle, questions }) => {
  const navigate = useNavigate();
  const [index, setIndex]       = useState(0);
  const [score, setScore]       = useState(0);
  const [selected, setSelected] = useState(null);

  const current  = questions[index];
  const isLast   = index + 1 === questions.length;
  const progress = ((index + 1) / questions.length) * 100;
  const labels   = ["A", "B", "C", "D"];

  const handleNext = () => {
    let newScore = score;
    if (selected === current.answer) newScore = score + 1;
    setScore(newScore);
    if (!isLast) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      navigate("/result", { state: { score: newScore, total: questions.length, topic } });
    }
  };

  return (
    <div style={{
      position: "fixed",
      left: 0,
      top: "60px",
      width: "100%",
      height: "100%",
      backgroundColor: "#000",
      color: "#fff",
      fontFamily: "sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "80px 24px 60px",
      boxSizing: "border-box",
    }}>

      {/* Card container — centered, max width */}
      <div style={{ width: "100%", maxWidth: "680px" }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
          <div>
            <p style={{ color: "#555", fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "4px" }}>{subtitle}</p>
            <h2 style={{ color: "#fff", fontSize: "22px", fontWeight: "700" }}>{topic}</h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ color: "#555", fontSize: "12px", marginBottom: "2px" }}>Question</p>
            <p style={{ color: "#fff", fontSize: "18px", fontWeight: "700" }}>
              {index + 1}<span style={{ color: "#333", fontSize: "14px" }}> / {questions.length}</span>
            </p>
          </div>
        </div>

        {/* ── Progress Bar ── */}
        <div style={{ width: "100%", height: "4px", backgroundColor: "#1a1a1a", borderRadius: "4px", overflow: "hidden", marginBottom: "36px" }}>
          <div style={{
            height: "100%",
            backgroundColor: "#fff",
            borderRadius: "4px",
            width: `${progress}%`,
            transition: "width 0.5s ease",
          }} />
        </div>

        {/* ── Question Card ── */}
        <div style={{
          backgroundColor: "#0d0d0d",
          border: "1px solid #1a1a1a",
          borderRadius: "12px",
          padding: "36px 32px",
        }}>

          {/* Question number badge */}
          <span style={{
            display: "inline-block",
            backgroundColor: "#1a1a1a",
            color: "#555",
            fontSize: "11px",
            fontWeight: "600",
            padding: "4px 12px",
            borderRadius: "20px",
            letterSpacing: "0.06em",
            marginBottom: "16px",
          }}>
            Q{index + 1} of {questions.length}
          </span>

          {/* Question text */}
          <h3 style={{
            color: "#fff",
            fontSize: "18px",
            fontWeight: "600",
            lineHeight: 1.6,
            marginBottom: "28px",
          }}>
            {current.question}
          </h3>

          {/* ── Options ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
            {current.options.map((option, i) => {
              const isSelected = selected === option;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(option)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "14px 18px",
                    borderRadius: "8px",
                    border: isSelected ? "1px solid #fff" : "1px solid #1f1f1f",
                    backgroundColor: isSelected ? "#fff" : "#141414",
                    color: isSelected ? "#000" : "#bbb",
                    fontSize: "14px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                    width: "100%",
                  }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = "#333"; }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = "#1f1f1f"; }}
                >
                  {/* Label badge */}
                  <span style={{
                    width: "28px",
                    height: "28px",
                    flexShrink: 0,
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: "700",
                    backgroundColor: isSelected ? "#000" : "#1f1f1f",
                    color: isSelected ? "#fff" : "#555",
                    border: isSelected ? "1px solid #333" : "1px solid #2a2a2a",
                  }}>
                    {labels[i]}
                  </span>
                  <span style={{ lineHeight: 1.5 }}>{option}</span>
                </button>
              );
            })}
          </div>

          {/* ── Footer Actions ── */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "24px",
            borderTop: "1px solid #1a1a1a",
          }}>
            <button
              onClick={() => navigate("/categories")}
              style={{ color: "#444", fontSize: "13px", background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.color = "#888"}
              onMouseLeave={e => e.currentTarget.style.color = "#444"}
            >
              ← Exit Quiz
            </button>

            <button
              onClick={handleNext}
              disabled={!selected}
              style={{
                backgroundColor: selected ? "#fff" : "#111",
                color: selected ? "#000" : "#333",
                fontWeight: "700",
                fontSize: "14px",
                padding: "11px 28px",
                borderRadius: "8px",
                border: selected ? "1px solid #fff" : "1px solid #1f1f1f",
                cursor: selected ? "pointer" : "not-allowed",
                transition: "all 0.15s ease",
              }}
            >
              {isLast ? "Submit →" : "Next →"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default QuizLayout;