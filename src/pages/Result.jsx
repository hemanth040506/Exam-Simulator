
import React from 'react';

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#0f172a",
    color: "#f8fafc",
    padding: "20px",
  },
  card: {
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "24px",
    padding: "40px",
    maxWidth: "500px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },
  emoji: {
    fontSize: "4rem",
    marginBottom: "16px",
    display: "block",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "8px",
    background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  score: {
    fontSize: "3.5rem",
    fontWeight: "800",
    color: "#e2e8f0",
    margin: "24px 0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "16px",
    marginBottom: "32px",
  },
  statItem: {
    background: "#0f172a",
    padding: "16px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  statLabel: {
    fontSize: "0.85rem",
    color: "#94a3b8",
  },
  statValue: {
    fontSize: "1.25rem",
    fontWeight: "700",
  },
  btn: {
    width: "100%",
    padding: "16px",
    fontSize: "1rem",
    fontWeight: "600",
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "background 0.2s",
  }
};

const Result = ({ score, stats, onGoHome }) => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <span style={styles.emoji}>🎉</span>
        <h1 style={styles.title}>Exam Completed!</h1>
        <p style={{ color: "#94a3b8" }}>You have successfully finished the exam.</p>

        <div style={styles.score}>
          {score} <span style={{ fontSize: "1rem", color: "#64748b" }}>Marks</span>
        </div>

        <div style={styles.grid}>
          <div style={styles.statItem}>
            <span style={{ ...styles.statValue, color: "#22c55e" }}>{stats.correct}</span>
            <span style={styles.statLabel}>Correct</span>
          </div>
          <div style={styles.statItem}>
            <span style={{ ...styles.statValue, color: "#ef4444" }}>{stats.wrong}</span>
            <span style={styles.statLabel}>Wrong</span>
          </div>
          <div style={styles.statItem}>
            <span style={{ ...styles.statValue, color: "#cbd5e1" }}>{stats.unattempted}</span>
            <span style={styles.statLabel}>Skipped</span>
          </div>
        </div>

        <button style={styles.btn} onClick={onGoHome}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default Result;
