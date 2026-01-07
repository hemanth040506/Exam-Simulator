import React from "react";

const styles = {
  panel: {
    width: "100%",
    padding: "16px",
    background: "#1e293b",
    borderLeft: "1px solid #334155",
    display: "flex",
    flexDirection: "column",
  },
  sectionTitle: {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#f8fafc",
    marginBottom: "12px",
    borderBottom: "2px solid #334155",
    paddingBottom: "6px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "8px",
    maxHeight: "240px",
    overflowY: "auto",
    paddingRight: "4px",
  },
  qBtn: {
    height: "44px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.1s, box-shadow 0.1s, opacity 0.2s",
  },
};

const PalettePanel = ({
  questions,
  currentQuestion,
  answers,
  marked,
  onJumpToQuestion,
}) => {
  const getStatusColor = (index, qId) => {
    if (index === currentQuestion) return "#3b82f6"; // Current
    if (marked[qId]) return "#eab308"; // Marked
    if (answers[qId]) return "#22c55e"; // Attempted
    return "#ef4444"; // Unattempted
  };

  return (
    <div style={styles.panel}>
      <div style={styles.sectionTitle}>Question Palette</div>

      <div style={styles.grid}>
        {questions.map((q, i) => (
          <button
            key={q.id}
            style={{
              ...styles.qBtn,
              background: getStatusColor(i, q.id),
              transform: i === currentQuestion ? "scale(1.05)" : "scale(1)",
              boxShadow:
                i === currentQuestion ? "0 0 0 2px #fff" : "none",
            }}
            onClick={() => onJumpToQuestion(i)}
            title={`Question ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PalettePanel;
