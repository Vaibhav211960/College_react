import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const user = {
  name: "John Doe",
  username: "john",
  joined: "January 2026",
};

const quizHistory = [
  { topic: "JavaScript", score: 4, total: 5, percent: 80,  date: "Mar 06, 2026" },
  { topic: "React.js",   score: 5, total: 5, percent: 100, date: "Mar 05, 2026" },
  { topic: "HTML",       score: 3, total: 5, percent: 60,  date: "Mar 04, 2026" },
  { topic: "CSS",        score: 5, total: 5, percent: 100, date: "Mar 03, 2026" },
  { topic: "Node.js",    score: 2, total: 5, percent: 40,  date: "Mar 02, 2026" },
  { topic: "MongoDB",    score: 4, total: 5, percent: 80,  date: "Mar 01, 2026" },
];

const totalQuizzes   = quizHistory.length;
const totalCorrect   = quizHistory.reduce((a, q) => a + q.score, 0);
const totalPossible  = quizHistory.reduce((a, q) => a + q.total, 0);
const avgPercent     = Math.round((totalCorrect / totalPossible) * 100);
const bestTopic      = [...quizHistory].sort((a, b) => b.percent - a.percent)[0].topic;

const scoreColor = (p) => {
  if (p === 100) return "#4ade80";
  if (p >= 80)   return "#60a5fa";
  if (p >= 60)   return "#facc15";
  return "#f87171";
};

const Profile = () => {
  const navigate  = useNavigate();
  const [tab, setTab] = useState("history");

  return (
    <div style={{position: "absolute", left: 0, top: "60px", width: "100%", backgroundColor: "#000", color: "#fff", fontFamily: "sans-serif", minHeight: "100vh" }}>

      {/* ── Header ── */}
      <div style={{ width: "100%", boxSizing: "border-box", backgroundColor: "#080808", borderBottom: "1px solid #1a1a1a", padding: "40px 40px 0" }}>

        <button
          onClick={() => navigate("/")}
          style={{ color: "#555", fontSize: "13px", background: "none", border: "none", cursor: "pointer", marginBottom: "28px", display: "block", padding: 0 }}
          onMouseEnter={e => e.currentTarget.style.color = "#aaa"}
          onMouseLeave={e => e.currentTarget.style.color = "#555"}
        >
          ← Back to Home
        </button>

        {/* Name & username */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#fff", marginBottom: "6px" }}>
            {user.name}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ color: "#555", fontSize: "13px" }}>@{user.username}</span>
            <span style={{ color: "#2a2a2a" }}>•</span>
            <span style={{ color: "#555", fontSize: "13px" }}>Joined {user.joined}</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderTop: "1px solid #1a1a1a" }}>
          {[
            { key: "history", label: "Quiz History" },
            { key: "stats",   label: "Stats"        },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "14px 22px", fontSize: "13px", fontWeight: "600",
                color: tab === t.key ? "#fff" : "#555",
                borderBottom: tab === t.key ? "2px solid #fff" : "2px solid transparent",
                transition: "color 0.15s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ width: "100%", boxSizing: "border-box", padding: "36px 40px" }}>

        {/* ══ HISTORY TAB ══ */}
        {tab === "history" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#fff" }}>All Attempts</h2>
              <span style={{ color: "#555", fontSize: "13px" }}>{totalQuizzes} quizzes taken</span>
            </div>

            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px 130px", padding: "8px 16px", borderBottom: "1px solid #1a1a1a", marginBottom: "8px" }}>
              {["Topic", "Score", "Result", "Date"].map((h) => (
                <span key={h} style={{ color: "#444", fontSize: "11px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
              ))}
            </div>

            {/* Rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {quizHistory.map((q, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid", gridTemplateColumns: "1fr 100px 100px 130px",
                    padding: "14px 16px",
                    backgroundColor: "#0d0d0d",
                    border: "1px solid #1a1a1a",
                    borderRadius: "8px",
                    alignItems: "center",
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#2a2a2a"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#1a1a1a"}
                >
                  <span style={{ color: "#fff", fontSize: "14px", fontWeight: "600" }}>{q.topic}</span>

                  <span style={{ color: "#aaa", fontSize: "14px" }}>
                    {q.score}<span style={{ color: "#333" }}>/{q.total}</span>
                  </span>

                  <span style={{
                    display: "inline-block", fontSize: "12px", fontWeight: "700",
                    color: scoreColor(q.percent),
                    backgroundColor: scoreColor(q.percent) + "18",
                    border: `1px solid ${scoreColor(q.percent)}33`,
                    padding: "3px 10px", borderRadius: "20px", width: "fit-content",
                  }}>
                    {q.percent}%
                  </span>

                  <span style={{ color: "#444", fontSize: "13px" }}>{q.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ STATS TAB ══ */}
        {tab === "stats" && (
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#fff", marginBottom: "20px" }}>Your Stats</h2>

            {/* 4 stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "32px" }}>
              {[
                { label: "Quizzes Taken",   value: totalQuizzes,        sub: "total attempts"          },
                { label: "Questions Done",  value: totalPossible,       sub: "total questions answered" },
                { label: "Correct Answers", value: totalCorrect,        sub: `out of ${totalPossible}`  },
                { label: "Average Score",   value: `${avgPercent}%`,    sub: "across all quizzes"       },
              ].map((s, i) => (
                <div key={i} style={{ backgroundColor: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: "10px", padding: "20px" }}>
                  <div style={{ fontSize: "30px", fontWeight: "800", color: "#fff", lineHeight: 1, marginBottom: "6px" }}>{s.value}</div>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#aaa", marginBottom: "2px" }}>{s.label}</div>
                  <div style={{ fontSize: "12px", color: "#444" }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Topic breakdown */}
            <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#fff", marginBottom: "12px" }}>Topic Breakdown</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
              {quizHistory.map((q, i) => (
                <div key={i} style={{ backgroundColor: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: "8px", padding: "14px 18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ color: "#fff", fontSize: "14px", fontWeight: "600" }}>{q.topic}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ color: "#555", fontSize: "13px" }}>{q.score}/{q.total}</span>
                      <span style={{ color: scoreColor(q.percent), fontSize: "13px", fontWeight: "700" }}>{q.percent}%</span>
                    </div>
                  </div>
                  <div style={{ width: "100%", height: "4px", backgroundColor: "#1a1a1a", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: "4px", backgroundColor: scoreColor(q.percent), width: `${q.percent}%`, transition: "width 0.5s ease" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Best topic */}
            <div style={{ backgroundColor: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: "10px", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ color: "#555", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Best Topic</p>
                <p style={{ color: "#fff", fontSize: "18px", fontWeight: "700" }}>{bestTopic}</p>
              </div>
              <span style={{ fontSize: "26px" }}>🏆</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;