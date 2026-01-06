
import React, { useState, useEffect, useCallback } from "react";
<<<<<<< HEAD
import { useParams, useNavigate } from "react-router-dom";
=======
>>>>>>> 41fdbde (Finalize clean project structure and UI components)
import { examData } from "../data";
import ExamHeader from "../components/ExamHeader";
import QuestionPanel from "../components/QuestionPanel";
import PalettePanel from "../components/PalettePanel";
import Legend from "../components/Legend";
import LiveSummary from "../components/LiveSummary";
import SubmitModal from "../components/SubmitModal";

function Exam({ onFinish }) {
<<<<<<< HEAD
  const { setId } = useParams();
  const navigate = useNavigate();

  // ======================
  // Setup & State
  // ======================
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [examName, setExamName] = useState("");
  const [duration, setDuration] = useState(0);

  const [timeLeft, setTimeLeft] = useState(0);
=======
  // ======================
  // Setup & State
  // ======================
  const [examType] = useState("GATE");
  const exam = examData[examType];
  const questions = exam.questions;

  const [timeLeft, setTimeLeft] = useState(exam.duration);
>>>>>>> 41fdbde (Finalize clean project structure and UI components)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});
  const [violations, setViolations] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // Derive current question object
<<<<<<< HEAD
  const q = questions.length > 0 ? questions[currentQuestion] : null;

  // ======================
  // Data Fetching
  // ======================
  useEffect(() => {
    const fetchExamData = async () => {
      if (!setId) {
        // Fallback to old exam data if no setId
        const examType = "GATE";
        const exam = examData[examType];
        setQuestions(exam.questions);
        setExamName(examType);
        setDuration(exam.duration);
        setTimeLeft(exam.duration * 60); // Convert minutes to seconds
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch exam set details (includes pattern)
        const setResponse = await fetch(
          `http://localhost:5000/api/exam-sets/${setId}`
        );
        if (!setResponse.ok) {
          throw new Error("Failed to fetch exam set details");
        }
        const setData = await setResponse.json();
        if (!setData.success) {
          throw new Error(setData.message || "Failed to fetch exam set");
        }

        const examSetData = setData.data;
        setExamName(examSetData.exam?.name || "Exam");
        setDuration(examSetData.pattern?.duration || 0);
        setTimeLeft((examSetData.pattern?.duration || 0) * 60); // Convert minutes to seconds

        // Fetch questions
        const questionsResponse = await fetch(
          `http://localhost:5000/api/exam-sets/${setId}/questions`
        );
        if (!questionsResponse.ok) {
          throw new Error("Failed to fetch questions");
        }
        const questionsData = await questionsResponse.json();
        if (!questionsData.success) {
          throw new Error(questionsData.message || "Failed to fetch questions");
        }

        // Transform backend questions to frontend format
        const transformedQuestions = questionsData.data.map((q, index) => ({
          id: index + 1,
          question: q.questionText,
          options: q.options || [],
          answer: Array.isArray(q.correctAnswer)
            ? q.correctAnswer.join(", ")
            : String(q.correctAnswer),
          marks: q.marks,
          negativeMarks: q.negativeMarks || 0,
          subject: q.section,
          type: q.type,
          _id: q._id.toString(), // Keep original ID for reference (as string for mapping)
        }));

        setQuestions(transformedQuestions);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching exam data:", err);
        setLoading(false);
      }
    };

    fetchExamData();
  }, [setId]);

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
=======
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
>>>>>>> 41fdbde (Finalize clean project structure and UI components)
    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

    questions.forEach((q) => {
      const userAns = answers[q.id];
      if (!userAns) {
        unattemptedCount++;
        return;
      }

<<<<<<< HEAD
      const marks = q.marks || 0;
      const negative = q.negativeMarks || 0;
=======
      const marks = q.marks || correct;
      const negative = q.marks ? -(q.marks / 3) : wrong;
>>>>>>> 41fdbde (Finalize clean project structure and UI components)

      if (userAns === q.answer) {
        score += marks;
        correctCount++;
      } else {
<<<<<<< HEAD
        score -= negative;
=======
        score += negative;
>>>>>>> 41fdbde (Finalize clean project structure and UI components)
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
<<<<<<< HEAD
  }, [answers, questions]);

  const submitExam = useCallback(async () => {
    setIsPending(true);
    setError(null);

    // If no setId, use old calculation method (fallback)
    if (!setId) {
      setTimeout(() => {
        const results = calculateResult();
        onFinish(results);
      }, 1500);
      return;
    }

    try {
      // Get JWT token from localStorage
      const token = localStorage.getItem('token') || localStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('Authentication required. Please login first.');
      }

      // Map answers using question _id (backend ID) instead of frontend id
      const answersMap = {};
      questions.forEach((q) => {
        const answer = answers[q.id];
        if (answer !== undefined && answer !== null && answer !== '') {
          // Only include attempted answers
          if (Array.isArray(answer)) {
            if (answer.length > 0) {
              answersMap[q._id] = answer;
            }
          } else {
            answersMap[q._id] = answer;
          }
        }
      });

      // Submit to backend
      const response = await fetch(
        `http://localhost:5000/api/exam-attempts/submit/${setId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            answers: answersMap,
          }),
        }
      );

      if (!response.ok) {
        let errorMessage = 'Failed to submit exam';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If response is not JSON, use status text
          if (response.status === 401) {
            errorMessage = 'Authentication failed. Please login again.';
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      if (data.success) {
        // Navigate to result page with backend evaluation results
        onFinish({
          score: data.data.score,
          stats: {
            total: data.data.stats.total,
            correct: data.data.stats.correct,
            wrong: data.data.stats.wrong,
            unattempted: data.data.stats.unattempted,
          },
        });
      } else {
        throw new Error(data.message || 'Failed to submit exam');
      }
    } catch (err) {
      setError(err.message);
      setIsPending(false);
      // Close the submit modal on error so user can try again
      setShowSummary(false);
      alert(`Error submitting exam: ${err.message}`);
      console.error('Error submitting exam:', err);
    }
  }, [answers, questions, setId, onFinish]);

  // Timer Effect
  useEffect(() => {
    if (timeLeft <= 0 || questions.length === 0) {
      if (timeLeft <= 0 && !isPending && questions.length > 0) {
        submitExam();
      }
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitExam, isPending, questions.length]);
=======
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
>>>>>>> 41fdbde (Finalize clean project structure and UI components)

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
<<<<<<< HEAD
  const handleAnswerSelect = (answer) => {
    // answer can be:
    // - string for MCQ
    // - array of strings for MSQ
    // - number or string for integer
    setAnswers({ ...answers, [q.id]: answer });
=======
  const handleAnswerSelect = (opt) => {
    setAnswers({ ...answers, [q.id]: opt });
>>>>>>> 41fdbde (Finalize clean project structure and UI components)
  };

  const handleToggleMark = () => {
    setMarked({ ...marked, [q.id]: !marked[q.id] });
  };

  const getLiveStats = () => {
    let attempted = 0;
    let markedCount = 0;
    questions.forEach((q) => {
<<<<<<< HEAD
      const answer = answers[q.id];
      // Check if question is attempted
      // For MSQ: array must have at least one item
      // For others: must be truthy and not empty string
      if (Array.isArray(answer)) {
        if (answer.length > 0) attempted++;
      } else if (answer !== undefined && answer !== null && answer !== '') {
        attempted++;
      }
=======
      if (answers[q.id]) attempted++;
>>>>>>> 41fdbde (Finalize clean project structure and UI components)
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

<<<<<<< HEAD
  // Loading State
  if (loading) {
    return (
      <div style={{ ...styles.layout, justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#94a3b8", fontSize: "18px", marginBottom: "20px" }}>
            Loading exam...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || questions.length === 0) {
    return (
      <div style={{ ...styles.layout, justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p style={{ color: "#ef4444", fontSize: "18px", marginBottom: "20px" }}>
            {error || "No questions available"}
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "10px 24px",
              borderRadius: "8px",
              background: "#3b82f6",
              color: "#fff",
              border: "none",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.layout}>
      <ExamHeader
        examName={examName}
        timeLeft={timeLeft}
        totalTime={duration * 60}
=======
  return (
    <div style={styles.layout}>
      <ExamHeader
        examName={examType}
        timeLeft={timeLeft}
        totalTime={exam.duration}
>>>>>>> 41fdbde (Finalize clean project structure and UI components)
        violations={violations}
      />

      <div style={styles.body}>
<<<<<<< HEAD
        {q && (
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
        )}
=======
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
>>>>>>> 41fdbde (Finalize clean project structure and UI components)

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
