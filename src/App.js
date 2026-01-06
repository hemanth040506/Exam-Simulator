import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

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

  const handleLogin = (userData) => {
    setUser(userData);
    navigate("/");
  };

  const handleSignup = (userData) => {
    setUser(userData);
    navigate("/");
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const handleFinishExam = (resultData) => {
    setFinalResult(resultData);
    navigate("/result");
  };

  const handleGoHome = () => {
    setFinalResult(null);
    navigate("/");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            user={user}
            onNavigate={(path) =>
              navigate(path === "home" ? "/" : `/${path}`)
            }
            onLogout={handleLogout}
          />
        }
      />

      <Route
        path="/login"
        element={
          <Login
            onLogin={handleLogin}
            onSwitchToSignup={() => navigate("/signup")}
          />
        }
      />

      <Route
        path="/signup"
        element={
          <Signup
            onSignup={handleSignup}
            onSwitchToLogin={() => navigate("/login")}
          />
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
