import React, { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";


import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Exam from "./pages/Exam";
import ExamSets from "./pages/ExamSets";
import Guidelines from "./pages/Guidelines";
import Result from "./pages/Result";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [user, setUser] = useState(null);
  const [finalResult, setFinalResult] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("exam_progress_GATE"); // Optional: clear exam progress too
    setUser(null);
    navigate("/");
  };

  const handleFinishExam = (resultData) => {
    setFinalResult(resultData);
    navigate("/result");
  };

  const handleGoHome = () => {
    setFinalResult(null);
    navigate("/home");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            user={user}
            onLogout={handleLogout}
          />
        }
      />

      <Route
        path="/home"
        element={
          <Home
            user={user}
            onLogout={handleLogout}
          />
        }
      />

      <Route
        path="/login"
        element={
          <Login
            setUser={setUser}
          />
        }
      />

      <Route
        path="/signup"
        element={
          <Signup />
        }
      />

      {/* Exam flow */}
      <Route path="/exam/:examKey" element={<ExamSets />} />
      <Route path="/exam-set/:setId" element={<Guidelines />} />
      <Route
        path="/exam/start/:setId"
        element={<Exam onFinish={handleFinishExam} />}
      />

      {/* Result */}
      <Route
        path="/result"
        element={
          finalResult ? (
            <Result
              score={finalResult.score}
              stats={finalResult.stats}
              breakdown={finalResult.breakdown}
              onGoHome={handleGoHome}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
