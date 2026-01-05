
const styles = {
  container: {
    background: "#0f172a",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #334155",
  },
  title: {
    margin: "0 0 16px 0",
    color: "#f8fafc",
    fontSize: "1rem",
  },
  statRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    fontSize: "0.9rem",
    color: "#cbd5e1",
  },
  value: {
    fontWeight: "600",
    color: "#fff",
  }
};

const LiveSummary = ({ stats }) => {
  return (
    <div style={styles.container}>
      <h4 style={styles.title}>Live Summary</h4>
      <div style={styles.statRow}>
        <span>Attempted</span>
        <span style={{ ...styles.value, color: "#22c55e" }}>{stats.attempted}</span>
      </div>
      <div style={styles.statRow}>
        <span>Unattempted</span>
        <span style={{ ...styles.value, color: "#ef4444" }}>{stats.unattempted}</span>
      </div>
      <div style={styles.statRow}>
        <span>Marked</span>
        <span style={{ ...styles.value, color: "#eab308" }}>{stats.marked}</span>
      </div>
    </div>
  );
};

export default LiveSummary;
