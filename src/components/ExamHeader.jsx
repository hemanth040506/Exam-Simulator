
const styles = {
  header: {
    height: "64px",
    background: "#1e293b",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px",
    borderBottom: "1px solid #334155",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#f1f5f9",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  timer: {
    fontSize: "1.1rem",
    fontWeight: "700",
    fontVariantNumeric: "tabular-nums",
    background: "#334155",
    padding: "8px 16px",
    borderRadius: "6px",
    color: "#e2e8f0",
  },
  violation: {
    color: "#ef4444",
    fontWeight: "600",
    fontSize: "0.9rem",
  }
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const ExamHeader = ({ examName, timeLeft, totalTime, violations }) => {
  return (
    <div style={styles.header}>
      <div style={styles.title}>{examName} Exam</div>
      <div style={styles.rightSection}>
        {violations > 0 && (
          <span style={styles.violation}>⚠ Violations: {violations}/3</span>
        )}
        <div style={styles.timer}>
          ⏱ {formatTime(timeLeft)} / {formatTime(totalTime)}
        </div>
      </div>
    </div>
  );
};

export default ExamHeader;
