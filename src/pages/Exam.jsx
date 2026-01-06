import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { examData } from "../data";

import ExamHeader from "../components/ExamHeader";
import QuestionPanel from "../components/QuestionPanel";
import PalettePanel from "../components/PalettePanel";
import Legend from "../components/Legend";
import LiveSummary from "../components/LiveSummary";
import SubmitModal from "../components/SubmitModal";

function Exam({ onFinish }) {
  const { setId } = useParams();
  const navigate = useNavigate();

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
  const [violations, setViolations] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const q = questions[currentQuestion];

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
          options: q.options,
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
  }, [setId]);

  // ======================
  // Anti-cheat
  // ======================
  const handleViolation = useCallback((msg) => {
    setViolations((v) => {
      const next = v + 1;
      alert(`Warning ${next}/3: ${msg}`);
      if (next >= 3) setTimeLeft(0);
      return next;
    });
  }, []);

  // ======================
  // Result Calculation
  // ======================
  const calculateResult = useCallback(() => {
    let score = 0, correct = 0, wrong = 0, unattempted = 0;

    questions.forEach((q) => {
      const ans = answers[q.id];
      if (!ans) {
        unattempted++;
        return;
      }
      if (ans === q.answer) {
        score += q.marks;
        correct++;
      } else {
        score -= q.negativeMarks;
        wrong++;
      }
    });

    return {
      score: score.toFixed(2),
      stats: { correct, wrong, unattempted, total: questions.length },
    };
  }, [answers, questions]);

  // ======================
  // Submit Exam
  // ======================
  const submitExam = useCallback(() => {
    setIsPending(true);
    setTimeout(() => {
      onFinish(calculateResult());
    }, 1200);
  }, [calculateResult, onFinish]);

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
  const handleAnswerSelect = (ans) =>
    setAnswers({ ...answers, [q.id]: ans });

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

  return (
    <div style={{ height: "100vh", background: "#0f172a", color: "#fff" }}>
      <ExamHeader
        examName={examName}
        timeLeft={timeLeft}
        totalTime={duration * 60}
        violations={violations}
      />

      <div style={{ display: "flex", height: "calc(100% - 64px)" }}>
        <QuestionPanel
          question={q}
          currentIndex={currentQuestion}
          totalQuestions={questions.length}
          selectedAnswer={answers[q?.id]}
          isMarked={marked[q?.id]}
          onSelectAnswer={handleAnswerSelect}
          onToggleMark={() =>
            setMarked({ ...marked, [q.id]: !marked[q.id] })
          }
          onNext={() =>
            setCurrentQuestion((c) => Math.min(c + 1, questions.length - 1))
          }
          onPrev={() => setCurrentQuestion((c) => Math.max(c - 1, 0))}
          onSubmit={() => setShowSummary(true)}
        />

        <PalettePanel
          questions={questions}
          currentQuestion={currentQuestion}
          answers={answers}
          marked={marked}
          onJumpToQuestion={setCurrentQuestion}
        />
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
