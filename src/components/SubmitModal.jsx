
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.8)",
    backdropFilter: "blur(4px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "16px",
    padding: "32px",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  title: {
    fontSize: "1.5rem",
    color: "#f8fafc",
    marginBottom: "24px",
  },
  statsContainer: {
    background: "#0f172a",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "24px",
  },
  statRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #334155",
    color: "#cbd5e1",
  },
  btnGroup: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
  },
  btn: {
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "1rem",
    flex: 1,
  },
  btnCancel: {
    background: "transparent",
    border: "1px solid #475569",
    color: "#94a3b8",
  },
  btnConfirm: {
    background: "#22c55e",
    color: "#fff",
  }
};

const SubmitModal = ({ stats, onCancel, onConfirm, isPending }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Submit Exam?</h2>

        <div style={styles.statsContainer}>
          <div style={styles.statRow}>
            <span>Attempted</span>
            <span style={{ color: "#22c55e" }}>{stats.attempted}</span>
          </div>
          <div style={styles.statRow}>
            <span>Marked for Review</span>
            <span style={{ color: "#eab308" }}>{stats.marked}</span>
          </div>
          <div style={{ ...styles.statRow, borderBottom: 'none' }}>
            <span>Unattempted</span>
            <span style={{ color: "#ef4444" }}>{stats.unattempted}</span>
          </div>
        </div>

        <div style={styles.btnGroup}>
          <button
            style={{ ...styles.btn, ...styles.btnCancel }}
            onClick={onCancel}
            disabled={isPending}
          >
            Go Back
          </button>
          <button
            style={{ ...styles.btn, ...styles.btnConfirm }}
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Yes, Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
