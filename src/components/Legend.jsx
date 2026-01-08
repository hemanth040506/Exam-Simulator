
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
        <span style={{ ...styles.dot, background: "#e2e8f0" }} /> Not Visited
      </div>
      <div style={styles.item}>
        <span style={{ ...styles.dot, background: "#ef4444" }} /> Not Answered
      </div>
      <div style={styles.item}>
        <span style={{ ...styles.dot, background: "#22c55e" }} /> Answered
      </div>
      <div style={styles.item}>
        <span style={{ ...styles.dot, background: "#a855f7" }} /> Marked for Review
      </div>
      <div style={styles.item}>
        <div style={{ position: 'relative', width: '12px', height: '12px' }}>
          <span style={{ ...styles.dot, background: "#7e22ce", position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
          <span style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%' }} />
        </div>
        &nbsp; Ans & Marked
      </div>
    </div>
  );
};

export default Legend;
