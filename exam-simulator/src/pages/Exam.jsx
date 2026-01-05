import { useState, useEffect } from "react";
import { examData } from "../data";

function Exam() {
  // ======================
  // Exam selection
  // ======================
  const [marked, setMarked] = useState({});

  const [examType, setExamType] = useState("GATE");
  const exam = examData[examType];
  const questions = exam.questions;
const totalTime = exam.duration;
  // ======================
  // States
  // ======================
  const [timeLeft, setTimeLeft] = useState(exam.duration);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [pending, setPending] = useState(false);
  const [warnings, setWarnings] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const q = questions[currentQuestion];

  // ======================
  useEffect(() => {
  setTimeLeft(exam.duration);
  setCurrentQuestion(0);
  setAnswers({});
  setWarnings(0);
  setShowResult(false);
  setShowSummary(false);
  setMarked({}); // ✅ ADD THIS
}, [examType, exam.duration]);

  // Reset on exam change
  // ======================
  useEffect(() => {
    setTimeLeft(exam.duration);
    setCurrentQuestion(0);
    setAnswers({});
    setWarnings(0);
    setShowResult(false);
    setShowSummary(false);
  }, [examType, exam.duration]);

  // ======================
  // Answer select
  // ======================
  const handleSelect = (option) => {
    setAnswers({ ...answers, [q.id]: option });
  };

  // ======================
  // Question status
  // ======================
  const getQuestionStatus = (index) => {
    const question = questions[index];
    if (index === currentQuestion) return "current";
if (marked[question.id]) return "marked";
if (answers[question.id]) return "attempted";
return "unattempted";

  };
  const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};


  // ======================
  // Score
  // ======================
  const calculateScore = () => {
    let score = 0;
    const { correct, wrong } = exam.marking;

    questions.forEach((q) => {
      if (!answers[q.id]) return;
      if (answers[q.id] === q.answer) score += correct;
      else score += wrong;
    });

    return score.toFixed(2);
  };

  const getResultStats = () => {
    let correct = 0,
      wrong = 0,
      unattempted = 0;

    questions.forEach((q) => {
      if (!answers[q.id]) unattempted++;
      else if (answers[q.id] === q.answer) correct++;
      else wrong++;
    });

    return { correct, wrong, unattempted };
  };
  const getLiveStats = () => {
  let attempted = 0;
  let markedCount = 0;

  questions.forEach((q) => {
    if (answers[q.id]) attempted++;
    if (marked[q.id]) markedCount++;
  });

  return {
    attempted,
    unattempted: questions.length - attempted,
    marked: markedCount,
  };
};


  // ======================
  // Timer
  // ======================
  useEffect(() => {
    if (showResult || pending) return;

    if (timeLeft === 0) {
      setPending(true);
      setTimeout(() => {
        setPending(false);
        setShowResult(true);
      }, 3000);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showResult, pending]);

  // ======================
  // UI
  // ======================
    return (
  <div style={styles.container}>
    {/* HEADER */}
    <div style={styles.header}>
      <h3>{examType} Exam</h3>
      <div style={styles.timer}>
  ⏱ {formatTime(timeLeft)} / {formatTime(totalTime)}
</div>
    </div>

    {pending ? (
      <div style={styles.center}>Submitting exam...</div>
    ) : !showResult ? (
      <div style={styles.body}>
        {/* LEFT PANEL */}
        <div style={styles.left}>
          {showSummary ? (
            <>
              <h3>Exam Summary</h3>

              {(() => {
                const { correct, wrong, unattempted } = getResultStats();
                return (
                  <>
                    <p>Attempted: {correct + wrong}</p>
                    <p>Unattempted: {unattempted}</p>
                  </>
                );
              })()}

              <button onClick={() => setShowSummary(false)}>Go Back</button>
              <button
                onClick={() => {
                  setPending(true);
                  setTimeout(() => {
                    setPending(false);
                    setShowResult(true);
                  }, 3000);
                }}
              >
                Confirm Submit
              </button>
            </>
          ) : (
            <>
              <h4>
                Question {currentQuestion + 1} of {questions.length}
              </h4>

              <p>{q.question}</p>

              {q.options.map((opt, i) => (
                <label key={i} style={styles.option}>
                  <input
                    type="radio"
                    checked={answers[q.id] === opt}
                    onChange={() => handleSelect(opt)}
                  />
                  {opt}
                </label>
              ))}
              <button
  onClick={() =>
    setMarked({ ...marked, [q.id]: !marked[q.id] })
  }
>
  {marked[q.id] ? "Unmark Review" : "Mark for Review"}
</button>


              <div style={styles.navBtns}>
                <button
                  disabled={currentQuestion === 0}
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                >
                  Previous
                </button>

                <button
                  disabled={currentQuestion === questions.length - 1}
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                >
                  Next
                </button>

                <button onClick={() => setShowSummary(true)}>
                  Submit
                </button>
              </div>
            </>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div style={styles.right}>
          <h4>Question Palette</h4>

          <div style={styles.palette}>
            {questions.map((_, i) => {
              const status = getQuestionStatus(i);
              let bg = "#f44336";      // unattempted - red
if (status === "attempted") bg = "#4caf50"; // green
if (status === "marked") bg = "#ffc107";    // yellow
if (status === "current") bg = "#2196f3";   // blue
              return (
                <button
                  key={i}
                  style={{ ...styles.qBtn, background: bg }}
                  onClick={() => setCurrentQuestion(i)}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <hr />

<h4>Status Legend</h4>
<p>🔵 Current</p>
<p>🟢 Attempted</p>
<p>🔴 Unattempted</p>
<p>🟡 Marked for Review</p>

<hr />

<h4>Live Summary</h4>
{(() => {
  const { attempted, unattempted, marked } = getLiveStats();
  return (
    <>
      <p>Attempted: {attempted}</p>
      <p>Unattempted: {unattempted}</p>
      <p>Marked: {marked}</p>
    </>
  );
})()}

        </div>
      </div>
    ) : (
      <div style={styles.center}>
        <h2>Result</h2>
        <p>Score: {calculateScore()}</p>
      </div>
    )}
  </div>
);

}
const styles = {
  container: { height: "100vh", display: "flex", flexDirection: "column" },
  header: {
    height: "60px",
    background: "#1e3c72",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
  },
  timer: { fontSize: "18px" },
  body: { flex: 1, display: "flex" },
  left: { flex: 3, padding: "20px" },
  right: {
    flex: 1,
    borderLeft: "1px solid #ddd",
    padding: "20px",
    background: "#f9f9f9",
  },
  palette: { display: "flex", flexWrap: "wrap", gap: "8px" },
  qBtn: {
    width: "35px",
    height: "35px",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  
  option: { display: "block", margin: "10px 0" },
  navBtns: { marginTop: "20px", display: "flex", gap: "10px" },
  center: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  
};

export default Exam;
