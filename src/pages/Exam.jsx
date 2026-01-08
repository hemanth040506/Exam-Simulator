import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { examData } from "../data";

import ExamHeader from "../components/ExamHeader";
import QuestionPanel from "../components/QuestionPanel";
import PalettePanel from "../components/PalettePanel";
import Legend from "../components/Legend";
import LiveSummary from "../components/LiveSummary";
import SubmitModal from "../components/SubmitModal";

function Exam({ onFinish }) {
  const { setId } = useParams();

  // ======================
  // State
  // ======================
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [examName, setExamName] = useState("");
  const [duration, setDuration] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});
  const [visited, setVisited] = useState({}); // New: Track visited questions
  const [violations] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // ======================
  // Fetch Exam Data
  // ======================
  useEffect(() => {
    const loadExam = async () => {
      try {
        setLoading(true);

        // 🔁 Fallback: static exam
        if (!setId) {
          const exam = examData.GATE;
          setQuestions(exam.questions);
          setExamName("GATE");
          setDuration(exam.duration);
          setTimeLeft(exam.duration * 60);
          setLoading(false);
          return;
        }

        // ✅ Backend exam
        const setRes = await fetch(`http://localhost:5000/api/exam-sets/${setId}`);
        const setJson = await setRes.json();
        if (!setJson.success) throw new Error(setJson.message);

        setExamName(setJson.data.exam.name);
        setDuration(setJson.data.pattern.duration);
        setTimeLeft(setJson.data.pattern.duration * 60);

        const qRes = await fetch(
          `http://localhost:5000/api/exam-sets/${setId}/questions`
        );
        const qJson = await qRes.json();
        if (!qJson.success) throw new Error(qJson.message);

        const formatted = qJson.data.map((q, i) => ({
          id: i + 1,
          question: q.questionText,
          type: q.type || "mcq", // Preserve question type (mcq, msq, integer, nat)
          options: q.options || [], // Ensure options is always an array
          answer: String(q.correctAnswer),
          marks: q.marks,
          negativeMarks: q.negativeMarks || 0,
          _id: q._id,
        }));

        setQuestions(formatted);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadExam();
    loadExam();
  }, [setId]);

  // ======================
  // Persistence: Restore
  // ======================
  useEffect(() => {
    if (loading) return;

    try {
      const key = `exam_progress_${setId || 'GATE'}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.timeLeft) setTimeLeft(parsed.timeLeft);
        if (parsed.answers) setAnswers(parsed.answers);
        if (parsed.marked) setMarked(parsed.marked);
        if (parsed.visited) setVisited(parsed.visited);
        // Only set current question if valid
        if (parsed.currentQuestion !== undefined) {
          setCurrentQuestion(parsed.currentQuestion);
        }
      }
    } catch (e) {
      console.error("Failed to restore exam progress", e);
    }
  }, [loading, setId]);

  // ======================
  // Persistence: Save
  // ======================
  useEffect(() => {
    if (loading || !questions.length) return;

    const key = `exam_progress_${setId || 'GATE'}`;
    const state = {
      timeLeft,
      answers,
      marked,
      visited,
      currentQuestion
    };

    localStorage.setItem(key, JSON.stringify(state));
  }, [timeLeft, answers, marked, visited, currentQuestion, loading, setId, questions.length]);

  // ======================
  // Track Visited
  // ======================
  useEffect(() => {
    if (questions.length > 0) {
      const currentQ = questions[currentQuestion];
      if (currentQ && currentQ.id) {
        setVisited((prev) => ({ ...prev, [currentQ.id]: true }));
      }
    }
  }, [currentQuestion, questions]);

  // ======================
  // Anti-cheat
  // ======================
  // Note: handleViolation is kept for future use if needed
  // const handleViolation = useCallback((msg) => {
  //   setViolations((v) => {
  //     const next = v + 1;
  //     alert(`Warning ${next}/3: ${msg}`);
  //     if (next >= 3) setTimeLeft(0);
  //     return next;
  //   });
  // }, []);

  // ======================
  // Result Calculation
  // ======================
  const calculateResult = useCallback(() => {
    let score = 0, correct = 0, wrong = 0, unattempted = 0;

    // Breakdown by question type
    let mcqCorrect = 0, mcqWrong = 0, mcqMarks = 0;
    let natCorrect = 0, natWrong = 0, natMarks = 0;

    questions.forEach((q) => {
      const ans = answers[q.id];
      if (!ans || ans === "") {
        unattempted++;
        return;
      }

      // NAT/Integer questions: exact numeric comparison, no negative marking
      if (q.type === "integer" || q.type === "nat") {
        const userNum = Number(ans);
        const correctNum = Number(q.answer);
        if (!isNaN(userNum) && !isNaN(correctNum) && userNum === correctNum) {
          score += q.marks;
          correct++;
          natCorrect++;
          natMarks += q.marks;
        } else {
          // NAT questions: no negative marking for wrong answers
          wrong++;
          natWrong++;
        }
      } else {
        // MCQ/MSQ: string comparison with negative marking
        if (ans === q.answer) {
          score += q.marks;
          correct++;
          mcqCorrect++;
          mcqMarks += q.marks;
        } else {
          score -= q.negativeMarks;
          wrong++;
          mcqWrong++;
          mcqMarks -= q.negativeMarks;
        }
      }
    });

    return {
      score: score.toFixed(2),
      stats: { correct, wrong, unattempted, total: questions.length },
      breakdown: {
        mcq: {
          correct: mcqCorrect,
          wrong: mcqWrong,
          marks: mcqMarks.toFixed(2),
        },
        nat: {
          correct: natCorrect,
          wrong: natWrong,
          marks: natMarks.toFixed(2),
        },
      },
    };
  }, [answers, questions]);

  // ======================
  // Submit Exam
  // ======================
  const submitExam = useCallback(() => {
    setIsPending(true);
    setTimeout(() => {
      localStorage.removeItem(`exam_progress_${setId || 'GATE'}`);
      onFinish(calculateResult());
    }, 1200);
  }, [calculateResult, onFinish, setId]);

  // ======================
  // Timer
  // ======================
  useEffect(() => {
    if (timeLeft <= 0 && !isPending && questions.length) {
      submitExam();
      return;
    }
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, submitExam, isPending, questions.length]);

  // ======================
  // Helpers
  // ======================
  const handleAnswerSelect = useCallback((ans) => {
    // Ensure currentQuestion is within bounds
    const safeIndex = Math.max(0, Math.min(currentQuestion, questions.length - 1));
    const currentQ = questions[safeIndex];
    if (!currentQ || !currentQ.id) return;
    setAnswers((prevAnswers) => ({ ...prevAnswers, [currentQ.id]: ans }));
  }, [currentQuestion, questions]);

  const getLiveStats = () => {
    let attempted = Object.keys(answers).length;
    let markedCount = Object.values(marked).filter(Boolean).length;
    return {
      attempted,
      unattempted: questions.length - attempted,
      marked: markedCount,
    };
  };

  // ======================
  // Render
  // ======================
  if (loading) return <div style={{ color: "#fff", textAlign: "center" }}>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!questions || questions.length === 0) return <div style={{ color: "#fff", textAlign: "center" }}>No questions available.</div>;

  // Ensure currentQuestion is within bounds
  const safeCurrentQuestion = Math.max(0, Math.min(currentQuestion, questions.length - 1));
  const q = questions[safeCurrentQuestion];

  if (!q) return <div style={{ color: "#fff", textAlign: "center" }}>Question not found.</div>;

  return (
    <div style={{ height: "100vh", background: "#0f172a", color: "#fff" }}>
      <ExamHeader
        examName={examName}
        timeLeft={timeLeft}
        totalTime={duration * 60}
        violations={violations}
      />

      <div style={{ display: "flex", height: "calc(100% - 64px)" }}>
        {/* LEFT: Question */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <QuestionPanel
            question={q}
            currentIndex={safeCurrentQuestion}
            totalQuestions={questions.length}
            selectedAnswer={answers[q?.id]}
            isMarked={marked[q?.id]}
            onSelectAnswer={handleAnswerSelect}
            onToggleMark={() => {
              if (!q || !q.id) return;
              setMarked({ ...marked, [q.id]: !marked[q.id] });
            }}
            onNext={() =>
              setCurrentQuestion((c) =>
                Math.min(c + 1, questions.length - 1)
              )
            }
            onPrev={() => setCurrentQuestion((c) => Math.max(c - 1, 0))}
            onSubmit={() => setShowSummary(true)}
          />
        </div>

        {/* RIGHT: Palette */}
        <div
          style={{
            width: "320px",
            borderLeft: "1px solid #334155",
            background: "#1e293b",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ padding: "16px", overflowY: "auto" }}>
            <PalettePanel
              questions={questions}
              currentQuestion={safeCurrentQuestion}
              answers={answers}
              marked={marked}
              visited={visited}
              onJumpToQuestion={(index) => {
                const safeIndex = Math.max(0, Math.min(index, questions.length - 1));
                setCurrentQuestion(safeIndex);
              }}
            />
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
