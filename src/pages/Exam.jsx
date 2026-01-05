
import React, { useState, useEffect, useCallback } from "react";
import { examData } from "../data";
import ExamHeader from "../components/ExamHeader";
import QuestionPanel from "../components/QuestionPanel";
import PalettePanel from "../components/PalettePanel";
import Legend from "../components/Legend";
import LiveSummary from "../components/LiveSummary";
import SubmitModal from "../components/SubmitModal";

function Exam({ onFinish }) {
  // ======================
  // Setup & State
  // ======================
  const [examType] = useState("GATE");
  const exam = examData[examType];
  const questions = exam.questions;

  const [timeLeft, setTimeLeft] = useState(exam.duration);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});
  const [violations, setViolations] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // Derive current question object
  const q = questions[currentQuestion];

  // ======================
  // Logic
  // ======================

  const handleViolation = useCallback((msg) => {
    setViolations((prev) => {
      const distinctViolations = prev + 1;
      if (distinctViolations >= 3) {
        alert("Maximum violations reached. Submitting exam.");
        // We need to trigger submit here, but cannot call submitExam directly due to dependency cycles if not careful.
        // We'll use a unique effect or just call it if available. 
        // For safety/cleanliness in this structure, we'll force the time to 0 or similar trigger.
        setTimeLeft(0);
      } else {
        alert(`Warning ${distinctViolations}/3: ${msg}`);
      }
      return distinctViolations;
    });
  }, []);

  const calculateResult = useCallback(() => {
    let score = 0;
    const { correct, wrong } = exam.marking;
    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

    questions.forEach((q) => {
      const userAns = answers[q.id];
      if (!userAns) {
        unattemptedCount++;
        return;
      }

      const marks = q.marks || correct;
      const negative = q.marks ? -(q.marks / 3) : wrong;

      if (userAns === q.answer) {
        score += marks;
        correctCount++;
      } else {
        score += negative;
        wrongCount++;
      }
    });

    return {
      score: score.toFixed(2),
      stats: {
        correct: correctCount,
        wrong: wrongCount,
        unattempted: unattemptedCount
      }
    };
  }, [answers, exam.marking, questions]);

  const submitExam = useCallback(() => {
    setIsPending(true);
    setTimeout(() => {
      const results = calculateResult();
      onFinish(results);
    }, 1500);
  }, [calculateResult, onFinish]);

  // Timer Effect
  useEffect(() => {
    if (timeLeft <= 0) {
      if (!isPending) submitExam();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitExam, isPending]);

  // Anti-Cheat Effects
  useEffect(() => {
    const handleContext = (e) => {
      e.preventDefault();
      handleViolation("Right-click disabled");
    };
    document.addEventListener("contextmenu", handleContext);
    return () => document.removeEventListener("contextmenu", handleContext);
  }, [handleViolation]);

  useEffect(() => {
    const handleKey = (e) => {
      if (
        (e.ctrlKey && ["c", "v", "x"].includes(e.key.toLowerCase())) ||
        (e.metaKey && ["c", "v", "x"].includes(e.key.toLowerCase())) ||
        e.key === "Escape"
      ) {
        e.preventDefault();
        handleViolation("Restricted key combination");
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleViolation]);

  // Tab Switch Detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleViolation("Tab switching is not allowed");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [handleViolation]);

  // ======================
  // Handlers
  // ======================
  const handleAnswerSelect = (opt) => {
    setAnswers({ ...answers, [q.id]: opt });
  };

  const handleToggleMark = () => {
    setMarked({ ...marked, [q.id]: !marked[q.id] });
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
  // Render
  // ======================
  const styles = {
    layout: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#0f172a",
      color: "#f8fafc",
      userSelect: "none", // Prevent text selection
    },
    body: {
      flex: 1,
      display: "flex",
      overflow: "hidden",
    },
    rightPanel: {
      width: "350px",
      display: "flex",
      flexDirection: "column",
    },
    rightContent: {
      flex: 1,
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      borderLeft: "1px solid #334155",
      backgroundColor: "#1e293b",
      overflowY: "auto",
    }
  };

  return (
    <div style={styles.layout}>
      <ExamHeader
        examName={examType}
        timeLeft={timeLeft}
        totalTime={exam.duration}
        violations={violations}
      />

      <div style={styles.body}>
        <QuestionPanel
          question={q}
          currentIndex={currentQuestion}
          totalQuestions={questions.length}
          selectedAnswer={answers[q.id]}
          isMarked={marked[q.id]}
          onSelectAnswer={handleAnswerSelect}
          onToggleMark={handleToggleMark}
          onNext={() => setCurrentQuestion(c => Math.min(c + 1, questions.length - 1))}
          onPrev={() => setCurrentQuestion(c => Math.max(c - 1, 0))}
          onSubmit={() => setShowSummary(true)}
        />

        <div style={styles.rightPanel}>
          <div style={styles.rightContent}>
            <div style={{ marginBottom: "24px" }}>
              <h4 style={{ margin: "0 0 16px 0", color: "#f8fafc", borderBottom: "2px solid #334155", paddingBottom: "8px" }}>Question Palette</h4>
              <PalettePanel
                questions={questions}
                currentQuestion={currentQuestion}
                answers={answers}
                marked={marked}
                onJumpToQuestion={setCurrentQuestion}
              />
            </div>

            <Legend />
            <LiveSummary stats={getLiveStats()} />
          </div>
        </div>
      </div>

      {showSummary && (
        <SubmitModal
          stats={getLiveStats()}
          onCancel={() => setShowSummary(false)}
          onConfirm={submitExam}
          isPending={isPending}
        />
      )}
    </div>
  );
}

export default Exam;
