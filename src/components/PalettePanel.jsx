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
    position: "relative",
    height: "44px",
    border: "none",
    borderRadius: "0",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.1s, box-shadow 0.1s, opacity 0.2s",
    clipPath: "polygon(0% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%)", // Optional: slight cut for style or just keeping it boxy
  },
  statusIndicator: {
    position: "absolute",
    bottom: "2px",
    right: "2px",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#22c55e",
  }
};

const PalettePanel = ({
  questions,
  currentQuestion,
  answers,
  marked,
  visited,
  onJumpToQuestion,
}) => {
  const getStatusStyle = (index, qId) => {
    const isAnswered = answers[qId] !== undefined && answers[qId] !== "" && answers[qId] !== null;
    const isMarked = marked[qId];
    const isVisited = visited[qId];

    // Status Priority Logic
    if (isAnswered && isMarked) {
      return { background: "#7e22ce", color: "#fff", icon: true }; // Answered & Marked (Purple + Green Hint)
    }
    if (isAnswered) {
      return { background: "#22c55e", color: "#fff", icon: false }; // Answered (Green)
    }
    if (isMarked) {
      return { background: "#a855f7", color: "#fff", icon: false }; // Marked for Review (Purple)
    }
    if (isVisited && !isAnswered) {
      return { background: "#ef4444", color: "#fff", icon: false }; // Not Answered (Red)
    }

    // Default: Not Visited
    return { background: "#e2e8f0", color: "#000", icon: false }; // White/Gray
  };

  return (
    <div style={styles.panel}>
      <div style={styles.sectionTitle}>Question Palette</div>

      <div style={styles.grid}>
        {questions.map((q, i) => {
          const { background, color, icon } = getStatusStyle(i, q.id);
          const isCurrent = i === currentQuestion;

          return (
            <button
              key={q.id}
              style={{
                ...styles.qBtn,
                background: background,
                color: color,
                transform: isCurrent ? "scale(1.05)" : "scale(1)",
                boxShadow: isCurrent ? "0 0 0 2px #3b82f6" : "none",
                borderRadius: "4px",
              }}
              onClick={() => onJumpToQuestion(i)}
              title={`Question ${i + 1}`}
            >
              {i + 1}
              {icon && <span style={styles.statusIndicator} />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PalettePanel;
