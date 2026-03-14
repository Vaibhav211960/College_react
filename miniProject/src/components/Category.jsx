import React from "react";
import { useNavigate } from "react-router-dom";

const topics = [
  { name: "HTML",       path: "/quiz/html",    desc: "Tags, structure, and semantic elements.",      tag: "Beginner" },
  { name: "CSS",        path: "/quiz/css",     desc: "Selectors, layout, flexbox, and box model.",   tag: "Beginner" },
  { name: "JavaScript", path: "/quiz/js",      desc: "Data types, functions, and ES6+ features.",    tag: "Core"     },
  { name: "React.js",   path: "/quiz/react",   desc: "Components, props, hooks, and rendering.",     tag: "Advanced" },
  { name: "Node.js",    path: "/quiz/node",    desc: "Modules, file system, and server runtime.",    tag: "Advanced" },
  { name: "MongoDB",    path: "/quiz/mongodb", desc: "Documents, collections, and CRUD operations.", tag: "Advanced" },
];

const tagStyle = {
  Beginner: { color: "#4ade80", backgroundColor: "rgba(74,222,128,0.08)",  border: "1px solid rgba(74,222,128,0.2)"  },
  Core:     { color: "#facc15", backgroundColor: "rgba(250,204,21,0.08)",  border: "1px solid rgba(250,204,21,0.2)"  },
  Advanced: { color: "#60a5fa", backgroundColor: "rgba(96,165,250,0.08)",  border: "1px solid rgba(96,165,250,0.2)"  },
};

const Category = () => {
  const navigate   = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleStart = (path) => {
    if (!isLoggedIn) navigate("/login");
    else navigate(path);
  };

  return (
    <div style={{
      position: "fixed", left: 0, top: "60px", width: "100%", height: "100%",
      backgroundColor: "#000", color: "#fff", fontFamily: "sans-serif",
      overflowY: "auto", boxSizing: "border-box",
    }}>
      <div style={{ width: "100%", padding: "48px 48px 60px", boxSizing: "border-box" }}>

        {/* ── Page Header ── */}
        <div style={{ marginBottom: "32px" }}>
          <button
            onClick={() => navigate("/")}
            style={{ color: "#555", fontSize: "13px", background: "none", border: "none", cursor: "pointer", marginBottom: "20px", display: "block", padding: 0 }}
            onMouseEnter={e => e.currentTarget.style.color = "#aaa"}
            onMouseLeave={e => e.currentTarget.style.color = "#555"}
          >
            ← Back to Home
          </button>
          <p style={{ color: "#444", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Step 01</p>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#fff", marginBottom: "6px" }}>All Topics</h1>
          <p style={{ color: "#555", fontSize: "14px" }}>Choose a topic to start your quiz.</p>
        </div>

        {/* ── Divider ── */}
        <div style={{ width: "100%", height: "1px", backgroundColor: "#1a1a1a", marginBottom: "32px" }} />

        {/* ── Topics Grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {topics.map((t, i) => (
            <div
              key={i}
              onClick={() => handleStart(t.path)}
              style={{
                backgroundColor: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: "10px",
                padding: "28px 28px 22px", cursor: "pointer", transition: "border-color 0.15s ease",
                display: "flex", flexDirection: "column", gap: "10px",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#333"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#1a1a1a"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#fff" }}>{t.name}</h3>
                <span style={{ fontSize: "11px", fontWeight: "600", padding: "3px 10px", borderRadius: "20px", whiteSpace: "nowrap", ...tagStyle[t.tag] }}>
                  {t.tag}
                </span>
              </div>
              <p style={{ color: "#555", fontSize: "13px", lineHeight: 1.6, flexGrow: 1, marginBottom: "18px" }}>{t.desc}</p>
              <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: isLoggedIn ? "#fff" : "#555", fontSize: "13px", fontWeight: "600" }}>
                  {isLoggedIn ? "Start Quiz" : "🔒 Login to Start"}
                </span>
                <span style={{ color: "#444", fontSize: "15px" }}>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer ── */}
        <div style={{ marginTop: "48px", paddingTop: "20px", borderTop: "1px solid #1a1a1a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#333", fontSize: "13px" }}>© 2026 QuizLet</span>
          <span style={{ color: "#333", fontSize: "13px" }}>6 topics • 30 questions</span>
        </div>

      </div>
    </div>
  );
};

export default Category;