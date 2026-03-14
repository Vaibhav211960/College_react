import React from "react";
import { useNavigate } from "react-router-dom";

const topics = [
  { title: "React.js",   path: "/quiz/react", desc: "Components, hooks, and state management.", tag: "Advanced" },
  { title: "JavaScript", path: "/quiz/js",    desc: "Core language, ES6+, and async patterns.", tag: "Core"     },
  { title: "HTML & CSS", path: "/quiz/html",  desc: "Semantic HTML and modern CSS styling.",    tag: "Beginner" },
];

const tagStyle = {
  Advanced: { color: "#60a5fa", backgroundColor: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.2)" },
  Core:     { color: "#facc15", backgroundColor: "rgba(250,204,21,0.08)", border: "1px solid rgba(250,204,21,0.2)" },
  Beginner: { color: "#4ade80", backgroundColor: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)" },
};

const stats = [
  { label: "Topics",      value: "6"    },
  { label: "Questions",   value: "30"   },
  { label: "Users",       value: "2.4k" },
  { label: "Free to Use", value: "100%" },
];

const steps = [
  { step: "01", title: "Pick a Topic",     desc: "Choose from 6 topics across frontend and backend."      },
  { step: "02", title: "Answer Questions", desc: "Go through 5 questions and pick the best answer."       },
  { step: "03", title: "See Your Score",   desc: "Get your result instantly with a percentage breakdown." },
];

const Home = () => {
  const navigate   = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleStart = (path) => {
    if (!isLoggedIn) navigate("/login");
    else navigate(path);
  };

  return (
    <div style={{ position: "absolute", left: 0, top: "60px", width: "100%", backgroundColor: "#000", color: "#fff", fontFamily: "sans-serif", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", boxSizing: "border-box", padding: "80px 40px 64px", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: "640px" }}>
          <p style={{ color: "#555", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>Technical Quiz Platform</p>
          <h1 style={{ fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: "800", lineHeight: 1.2, marginBottom: "18px", color: "#fff" }}>
            Test what you know.<br />
            <span style={{ color: "#333" }}>Learn what you don't.</span>
          </h1>
          <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.7, marginBottom: "32px" }}>
            Pick a topic and answer 5 questions. Simple, fast, and to the point.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <button
              onClick={() => isLoggedIn ? navigate("/categories") : navigate("/login")}
              style={{ backgroundColor: "#fff", color: "#000", fontWeight: "700", fontSize: "14px", padding: "12px 26px", borderRadius: "8px", border: "none", cursor: "pointer" }}
            >
              Start a Quiz
            </button>
            <button
              onClick={() => navigate("/categories")}
              style={{ backgroundColor: "transparent", color: "#555", fontWeight: "500", fontSize: "14px", border: "none", cursor: "pointer", padding: 0 }}
            >
              View all topics →
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ width: "100%", boxSizing: "border-box", backgroundColor: "#080808", borderBottom: "1px solid #1a1a1a", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ padding: "28px 40px", borderRight: i < stats.length - 1 ? "1px solid #1a1a1a" : "none" }}>
            <div style={{ fontSize: "32px", fontWeight: "800", color: "#fff", lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: "13px", color: "#555", marginTop: "5px" }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── Popular Topics ── */}
      <section style={{ width: "100%", boxSizing: "border-box", padding: "56px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
          <div>
            <p style={{ color: "#444", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "5px" }}>Featured</p>
            <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#fff" }}>Popular Topics</h2>
          </div>
          <button onClick={() => navigate("/categories")} style={{ color: "#555", fontSize: "13px", background: "none", border: "none", cursor: "pointer" }}>
            View all →
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
          {topics.map((t) => (
            <div
              key={t.title}
              onClick={() => handleStart(t.path)}
              style={{ backgroundColor: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: "10px", padding: "22px", cursor: "pointer", transition: "border-color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#333"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#1a1a1a"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#fff" }}>{t.title}</h3>
                <span style={{ fontSize: "11px", fontWeight: "600", padding: "3px 10px", borderRadius: "20px", whiteSpace: "nowrap", ...tagStyle[t.tag] }}>
                  {t.tag}
                </span>
              </div>
              <p style={{ color: "#555", fontSize: "13px", lineHeight: 1.6, marginBottom: "18px" }}>{t.desc}</p>
              <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: isLoggedIn ? "#fff" : "#555", fontSize: "13px", fontWeight: "600" }}>
                  {isLoggedIn ? "Start Quiz" : "🔒 Login to Start"}
                </span>
                <span style={{ color: "#444" }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{ width: "100%", boxSizing: "border-box", backgroundColor: "#080808", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", padding: "56px 40px" }}>
        <p style={{ color: "#444", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "5px" }}>Simple Process</p>
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#fff", marginBottom: "32px" }}>How it works</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px" }}>
          {steps.map((item) => (
            <div key={item.step}>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#2a2a2a", letterSpacing: "0.1em", display: "block", marginBottom: "10px" }}>{item.step}</span>
              <div style={{ width: "28px", height: "2px", backgroundColor: "#222", marginBottom: "12px" }} />
              <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#fff", marginBottom: "6px" }}>{item.title}</h3>
              <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ width: "100%", boxSizing: "border-box", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#333", fontSize: "13px" }}>© 2026 QuizLet</span>
        <div style={{ display: "flex", gap: "20px" }}>
          <button style={{ color: "#333", fontSize: "13px", background: "none", border: "none", cursor: "pointer" }}>About</button>
          <button style={{ color: "#333", fontSize: "13px", background: "none", border: "none", cursor: "pointer" }}>Support</button>
        </div>
      </footer>

    </div>
  );
};

export default Home;