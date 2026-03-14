import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const user = {
  name: "vivek oberoy",
  username: "vivek",
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

const scoreLabel = (p) => {
  if (p === 100) return "Perfect";
  if (p >= 80)   return "Great";
  if (p >= 60)   return "Good";
  return "Retry";
};

const Profile = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("history");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [hoveredRow, setHoveredRow] = useState(null);

  const filteredHistory = quizHistory.filter((q) => {
    const matchSearch = q.topic.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "perfect" && q.percent === 100) ||
      (filter === "pass" && q.percent >= 60 && q.percent < 100) ||
      (filter === "fail" && q.percent < 60);
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ position: "absolute", left: 0, top: "60px", width: "100%", backgroundColor: "#000", color: "#fff", fontFamily: "sans-serif", minHeight: "100vh" }}>

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

        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#fff", marginBottom: "6px" }}>{user.name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ color: "#555", fontSize: "13px" }}>@{user.username}</span>
            <span style={{ color: "#2a2a2a" }}>•</span>
            <span style={{ color: "#555", fontSize: "13px" }}>Joined {user.joined}</span>
          </div>
        </div>

        <div style={{ display: "flex", borderTop: "1px solid #1a1a1a" }}>
          {[{ key: "history", label: "Quiz History" }, { key: "stats", label: "Stats" }].map((t) => (
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

            {/* Quick summary bar */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "24px" }}>
              {[
                { label: "Quizzes Taken", value: totalQuizzes },
                { label: "Avg Score",     value: `${avgPercent}%` },
                { label: "Best Topic",    value: bestTopic },
              ].map((s, i) => (
                <div key={i} style={{ backgroundColor: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: "8px", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#555", fontSize: "12px" }}>{s.label}</span>
                  <span style={{ color: "#fff", fontSize: "14px", fontWeight: "700" }}>{s.value}</span>
                </div>
              ))}
            </div>

            {/* Search + filter row */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "18px", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Search topic..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  flex: 1, backgroundColor: "#0d0d0d", border: "1px solid #1a1a1a",
                  borderRadius: "6px", padding: "8px 14px", color: "#fff",
                  fontSize: "13px", outline: "none",
                }}
                onFocus={e => e.target.style.borderColor = "#333"}
                onBlur={e => e.target.style.borderColor = "#1a1a1a"}
              />
              {["all", "perfect", "pass", "fail"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    background: filter === f ? "#1a1a1a" : "none",
                    border: `1px solid ${filter === f ? "#333" : "#1a1a1a"}`,
                    borderRadius: "6px", padding: "7px 14px",
                    color: filter === f ? "#fff" : "#555",
                    fontSize: "12px", fontWeight: "600",
                    cursor: "pointer", textTransform: "capitalize", transition: "all 0.15s",
                  }}
                >
                  {f}
                </button>
              ))}
              <span style={{ color: "#444", fontSize: "12px", whiteSpace: "nowrap" }}>
                {filteredHistory.length} result{filteredHistory.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 110px 110px 130px", padding: "8px 16px", borderBottom: "1px solid #1a1a1a", marginBottom: "8px" }}>
              {["Topic", "Score", "Result", "Bar", "Date"].map((h) => (
                <span key={h} style={{ color: "#444", fontSize: "11px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
              ))}
            </div>

            {/* Rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {filteredHistory.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#444", fontSize: "14px" }}>
                  No quizzes match your filter.
                </div>
              ) : (
                filteredHistory.map((q, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{
                      display: "grid", gridTemplateColumns: "1fr 90px 110px 110px 130px",
                      padding: "14px 16px",
                      backgroundColor: hoveredRow === i ? "#111" : "#0d0d0d",
                      border: `1px solid ${hoveredRow === i ? "#2a2a2a" : "#1a1a1a"}`,
                      borderRadius: "8px",
                      alignItems: "center",
                      transition: "background-color 0.15s, border-color 0.15s",
                      cursor: "default",
                    }}
                  >
                    {/* Topic */}
                    <span style={{ color: "#fff", fontSize: "14px", fontWeight: "600" }}>{q.topic}</span>

                    {/* Score */}
                    <span style={{ color: "#aaa", fontSize: "14px" }}>
                      {q.score}<span style={{ color: "#333" }}>/{q.total}</span>
                    </span>

                    {/* Badge */}
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: "5px",
                      fontSize: "12px", fontWeight: "700",
                      color: scoreColor(q.percent),
                      backgroundColor: scoreColor(q.percent) + "18",
                      border: `1px solid ${scoreColor(q.percent)}33`,
                      padding: "3px 10px", borderRadius: "20px", width: "fit-content",
                    }}>
                      {scoreLabel(q.percent)} · {q.percent}%
                    </span>

                    {/* Mini progress bar */}
                    <div style={{ width: "80px", height: "4px", backgroundColor: "#1a1a1a", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{
                        height: "100%", borderRadius: "4px",
                        backgroundColor: scoreColor(q.percent),
                        width: `${q.percent}%`,
                      }} />
                    </div>

                    {/* Date */}
                    <span style={{ color: "#444", fontSize: "13px" }}>{q.date}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ══ STATS TAB ══ */}
        {tab === "stats" && (
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#fff", marginBottom: "20px" }}>Your Stats</h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "32px" }}>
              {[
                { label: "Quizzes Taken",   value: totalQuizzes,     sub: "total attempts"           },
                { label: "Questions Done",  value: totalPossible,    sub: "total questions answered"  },
                { label: "Correct Answers", value: totalCorrect,     sub: `out of ${totalPossible}`   },
                { label: "Average Score",   value: `${avgPercent}%`, sub: "across all quizzes"        },
              ].map((s, i) => (
                <div key={i} style={{ backgroundColor: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: "10px", padding: "20px" }}>
                  <div style={{ fontSize: "30px", fontWeight: "800", color: "#fff", lineHeight: 1, marginBottom: "6px" }}>{s.value}</div>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#aaa", marginBottom: "2px" }}>{s.label}</div>
                  <div style={{ fontSize: "12px", color: "#444" }}>{s.sub}</div>
                </div>
              ))}
            </div>

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