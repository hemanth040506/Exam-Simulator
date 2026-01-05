import React from "react";

function Home({ onStart }) {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Exam Simulator</h1>
        <p style={styles.subtitle}>
          Practice GATE & other competitive exams in real exam conditions
        </p>
      </header>

      <div style={styles.card}>
        <h2>Welcome 👋</h2>
        <p style={styles.text}>
          This platform helps you experience real competitive exams with
          timers, negative marking, warnings, and instant results.
        </p>

        <ul style={styles.list}>
          <li>⏱ Timed exams</li>
          <li>🖥 Fullscreen exam mode</li>
          <li>⚠ Tab-switch detection</li>
          <li>📊 Instant results & analytics</li>
        </ul>

        <button style={styles.button} onClick={onStart}>
          Start Practice
        </button>
      </div>

      <footer style={styles.footer}>
        <p>Supported Exams: GATE • EAMCET • More coming soon</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "40px 20px",
  },
  header: { textAlign: "center" },
  title: { fontSize: "42px", marginBottom: "10px" },
  subtitle: { fontSize: "18px", opacity: 0.9 },
  card: {
    background: "#fff",
    color: "#000",
    borderRadius: "12px",
    padding: "30px",
    maxWidth: "420px",
    width: "100%",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  text: { margin: "15px 0", fontSize: "15px" },
  list: { textAlign: "left", margin: "20px 0" },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    background: "#1e3c72",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  footer: { fontSize: "14px", opacity: 0.85 },
};

export default Home;
