
const styles = {
  panel: {
    flex: 1,
    borderLeft: "1px solid #334155",
    padding: "24px",
    background: "#1e293b",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    maxWidth: "350px",
  },
  sectionTitle: {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#f8fafc",
    marginBottom: "16px",
    borderBottom: "2px solid #334155",
    paddingBottom: "8px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "8px",
    marginBottom: "32px",
  },
  qBtn: {
    aspectRatio: "1",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#fff",
    transition: "transform 0.1s, opacity 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: "1px",
    background: "#334155",
    margin: "0 0 24px 0",
    border: "none",
  }
};

const PalettePanel = ({ questions, currentQuestion, answers, marked, onJumpToQuestion }) => {

  const getStatusColor = (index, qId) => {
    if (index === currentQuestion) return "#3b82f6"; // Blue (Current)
    if (marked[qId]) return "#eab308"; // Yellow (Marked)
    if (answers[qId]) return "#22c55e"; // Green (Attempted)
    return "#ef4444"; // Red (Unattempted)
  };

  return (
    <div style={styles.grid}>
      {questions.map((q, i) => (
        <button
          key={q.id}
          style={{
            ...styles.qBtn,
            background: getStatusColor(i, q.id),
            transform: i === currentQuestion ? "scale(1.1)" : "scale(1)",
            boxShadow: i === currentQuestion ? "0 0 0 2px #fff" : "none"
          }}
          onClick={() => onJumpToQuestion(i)}
          title={`Question ${i + 1}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default PalettePanel;
