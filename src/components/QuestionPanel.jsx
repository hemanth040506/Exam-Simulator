
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
    transition: "all 0.2s",
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
    fontSize: "0.95rem",
    display: "flex",
    alignItems: "center",
    gap: "8px",
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
  }
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
  onSubmit
}) => {
  return (
    <div style={styles.panel}>
      <div>
        <div style={styles.questionHeader}>
          <h3 style={{ margin: 0, color: "#94a3b8" }}>
            Question {currentIndex + 1} <span style={{ fontSize: "0.9em", opacity: 0.7 }}>/ {totalQuestions}</span>
          </h3>
          <span style={styles.statusBadge}>
<<<<<<< HEAD
            Marks: {question.marks || 1} | Neg: {question.negativeMarks !== undefined ? question.negativeMarks : (question.marks ? (question.marks / 3).toFixed(2) : 0.33)}
=======
            Marks: {question.marks || 1} | Neg: {question.marks ? (question.marks / 3).toFixed(2) : 0.33}
>>>>>>> 41fdbde (Finalize clean project structure and UI components)
          </span>
        </div>

        <p style={styles.questionText}>{question.question}</p>

<<<<<<< HEAD
        {/* MCQ - Radio buttons (single selection) */}
        {/* Default to MCQ if type is not specified (backward compatibility) */}
        {(!question.type || question.type === 'mcq') && question.options && question.options.length > 0 && (
          <div style={styles.optionsList}>
            {question.options.map((opt, i) => {
              const isSelected = selectedAnswer === opt;
              return (
                <label
                  key={i}
                  style={{
                    ...styles.optionLabel,
                    ...(isSelected ? styles.optionLabelSelected : {})
                  }}
                >
                  <input
                    type="radio"
                    name={`q-${question.id}`}
                    style={styles.radio}
                    checked={isSelected}
                    onChange={() => onSelectAnswer(opt)}
                  />
                  {opt}
                </label>
              );
            })}
          </div>
        )}

        {/* MSQ - Checkboxes (multiple selection) */}
        {question.type === 'msq' && question.options && question.options.length > 0 && (
          <div style={styles.optionsList}>
            {question.options.map((opt, i) => {
              // Ensure selectedAnswer is always treated as an array for MSQ
              const selectedAnswers = Array.isArray(selectedAnswer) 
                ? selectedAnswer 
                : (selectedAnswer ? [selectedAnswer] : []);
              const isSelected = selectedAnswers.includes(opt);
              return (
                <label
                  key={i}
                  style={{
                    ...styles.optionLabel,
                    ...(isSelected ? styles.optionLabelSelected : {})
                  }}
                >
                  <input
                    type="checkbox"
                    name={`q-${question.id}-${i}`}
                    style={styles.radio}
                    checked={isSelected}
                    onChange={(e) => {
                      const currentAnswers = Array.isArray(selectedAnswer) 
                        ? selectedAnswer 
                        : (selectedAnswer ? [selectedAnswer] : []);
                      if (e.target.checked) {
                        // Add option to selected answers
                        onSelectAnswer([...currentAnswers, opt]);
                      } else {
                        // Remove option from selected answers
                        onSelectAnswer(currentAnswers.filter(a => a !== opt));
                      }
                    }}
                  />
                  {opt}
                </label>
              );
            })}
          </div>
        )}

        {/* Integer (NAT) - Numeric input */}
        {question.type === 'integer' && (
          <div style={{ marginTop: "16px" }}>
            <input
              type="number"
              value={selectedAnswer || ''}
              onChange={(e) => {
                const value = e.target.value;
                // Allow empty string or valid number
                if (value === '' || !isNaN(value)) {
                  onSelectAnswer(value === '' ? '' : Number(value));
                }
              }}
              placeholder="Enter your answer (numeric value)"
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: "16px",
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#f8fafc",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3b82f6";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#334155";
              }}
            />
            <p style={{ marginTop: "8px", fontSize: "14px", color: "#94a3b8" }}>
              Enter a numeric value only
            </p>
          </div>
        )}
=======
        <div style={styles.optionsList}>
          {question.options.map((opt, i) => {
            const isSelected = selectedAnswer === opt;
            return (
              <label
                key={i}
                style={{
                  ...styles.optionLabel,
                  ...(isSelected ? styles.optionLabelSelected : {})
                }}
              >
                <input
                  type="radio"
                  name={`q-${question.id}`}
                  style={styles.radio}
                  checked={isSelected}
                  onChange={() => onSelectAnswer(opt)}
                />
                {opt}
              </label>
            );
          })}
        </div>
>>>>>>> 41fdbde (Finalize clean project structure and UI components)
      </div>

      <div style={styles.footer}>
        <button
          style={{
            ...styles.btn,
            ...(isMarked ? styles.btnWarningActive : styles.btnWarning)
          }}
          onClick={onToggleMark}
        >
          {isMarked ? "★ Marked for Review" : "☆ Mark for Review"}
        </button>

        <div style={styles.navGroup}>
          <button
            style={{ ...styles.btn, ...styles.btnSecondary, opacity: currentIndex === 0 ? 0.5 : 1 }}
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
