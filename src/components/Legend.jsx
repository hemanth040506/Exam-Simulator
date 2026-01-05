
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "24px",
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "0.9rem",
    color: "#94a3b8",
  },
  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
  }
};

const Legend = () => {
  return (
    <div style={styles.container}>
      <h4 style={{ margin: "0 0 12px 0", color: "#f8fafc", fontSize: "1rem" }}>Status Legend</h4>
      <div style={styles.item}>
        <span style={{ ...styles.dot, background: "#3b82f6" }} /> Current
      </div>
      <div style={styles.item}>
        <span style={{ ...styles.dot, background: "#22c55e" }} /> Attempted
      </div>
      <div style={styles.item}>
        <span style={{ ...styles.dot, background: "#ef4444" }} /> Unattempted
      </div>
      <div style={styles.item}>
        <span style={{ ...styles.dot, background: "#eab308" }} /> Marked for Review
      </div>
    </div>
  );
};

export default Legend;
