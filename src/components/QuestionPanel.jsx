import React from "react";

const styles = {
  panel: {
    flex: 3,
    padding: "32px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  questionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  statusBadge: {
    fontSize: "0.85rem",
    fontWeight: "600",
    padding: "4px 12px",
    borderRadius: "12px",
    background: "#334155",
    color: "#cbd5e1",
  },
  questionText: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    color: "#f8fafc",
    marginBottom: "24px",
  },
  optionsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  optionLabel: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "8px",
    cursor: "pointer",
  },
  optionLabelSelected: {
    background: "#2563eb",
    borderColor: "#3b82f6",
    color: "#fff",
  },
  radio: {
    marginRight: "12px",
    width: "18px",
    height: "18px",
    accentColor: "#3b82f6",
  },
  footer: {
    marginTop: "auto",
    paddingTop: "32px",
    borderTop: "1px solid #334155",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navGroup: {
    display: "flex",
    gap: "12px",
  },
  btn: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
  },
  btnSecondary: {
    background: "#334155",
    color: "#f1f5f9",
  },
  btnPrimary: {
    background: "#3b82f6",
    color: "#ffffff",
  },
  btnWarning: {
    background: "transparent",
    border: "1px solid #eab308",
    color: "#eab308",
  },
  btnWarningActive: {
    background: "#eab308",
    color: "#000",
  },
  btnSubmit: {
    background: "#22c55e",
    color: "#ffffff",
  },
};

const QuestionPanel = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  isMarked,
  onSelectAnswer,
  onToggleMark,
  onNext,
  onPrev,
  onSubmit,
}) => {
  if (!question) return null;

  const renderOptions = () => {
    // MCQ
    if (!question.type || question.type === "mcq") {
      return question.options.map((opt, i) => {
        const isSelected = selectedAnswer === opt;
        return (
          <label
            key={i}
            style={{
              ...styles.optionLabel,
              ...(isSelected ? styles.optionLabelSelected : {}),
            }}
          >
            <input
              type="radio"
              style={styles.radio}
              checked={isSelected}
              onChange={() => onSelectAnswer(opt)}
            />
            {opt}
          </label>
        );
      });
    }

    // MSQ
    if (question.type === "msq") {
      const answers = Array.isArray(selectedAnswer) ? selectedAnswer : [];
      return question.options.map((opt, i) => {
        const isSelected = answers.includes(opt);
        return (
          <label
            key={i}
            style={{
              ...styles.optionLabel,
              ...(isSelected ? styles.optionLabelSelected : {}),
            }}
          >
            <input
              type="checkbox"
              style={styles.radio}
              checked={isSelected}
              onChange={(e) => {
                if (e.target.checked) {
                  onSelectAnswer([...answers, opt]);
                } else {
                  onSelectAnswer(answers.filter((a) => a !== opt));
                }
              }}
            />
            {opt}
          </label>
        );
      });
    }

    // INTEGER / NAT
    if (question.type === "integer") {
      return (
        <input
          type="number"
          value={selectedAnswer ?? ""}
          onChange={(e) => onSelectAnswer(e.target.value)}
          placeholder="Enter numeric answer"
          style={{
            padding: "12px",
            background: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "8px",
            color: "#f8fafc",
          }}
        />
      );
    }

    return null;
  };

  return (
    <div style={styles.panel}>
      <div>
        <div style={styles.questionHeader}>
          <h3 style={{ color: "#94a3b8" }}>
            Question {currentIndex + 1} / {totalQuestions}
          </h3>
          <span style={styles.statusBadge}>
            Marks: {question.marks || 1} | Neg:{" "}
            {question.negativeMarks ?? 0}
          </span>
        </div>

        <p style={styles.questionText}>{question.question}</p>

        <div style={styles.optionsList}>{renderOptions()}</div>
      </div>

      <div style={styles.footer}>
        <button
          style={{
            ...styles.btn,
            ...(isMarked ? styles.btnWarningActive : styles.btnWarning),
          }}
          onClick={onToggleMark}
        >
          {isMarked ? "★ Marked" : "☆ Mark for Review"}
        </button>

        <div style={styles.navGroup}>
          <button
            style={{ ...styles.btn, ...styles.btnSecondary }}
            onClick={onPrev}
            disabled={currentIndex === 0}
          >
            ← Previous
          </button>

          {currentIndex < totalQuestions - 1 ? (
            <button
              style={{ ...styles.btn, ...styles.btnPrimary }}
              onClick={onNext}
            >
              Next →
            </button>
          ) : (
            <button
              style={{ ...styles.btn, ...styles.btnSubmit }}
              onClick={onSubmit}
            >
              Submit Exam
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionPanel;
