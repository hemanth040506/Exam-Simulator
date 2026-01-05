// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../index.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="home-hero">
        <h1>Online Examination Simulator</h1>
        <p>
          Experience real exam conditions with strict monitoring and
          professional evaluation.
        </p>

        <input
          className="home-search"
          type="text"
          placeholder="Search exams (GATE, JEE, EAMCET...)"
        />
      </section>

      {/* EXAM SELECTION */}
      <section className="home-exams">
        <h2>Available Exams</h2>

        <div className="exam-cards">
          <div
            className="exam-card"
            onClick={() => navigate("/exam/gate")}
          >
            <h3>GATE</h3>
            <p>Graduate Aptitude Test in Engineering</p>
            <button>Start</button>
          </div>

          <div
            className="exam-card"
            onClick={() => navigate("/exam/jee")}
          >
            <h3>JEE</h3>
            <p>Joint Entrance Examination</p>
            <button>Start</button>
          </div>

          <div
            className="exam-card"
            onClick={() => navigate("/exam/eamcet")}
          >
            <h3>EAMCET</h3>
            <p>Engineering & Medical Common Entrance Test</p>
            <button>Start</button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="home-about" id="about">
        <h2>About Us</h2>
        <p>
          This platform is designed to simulate real competitive examinations
          with strict anti-cheat mechanisms, real-time evaluation, and
          professional exam flow.
        </p>
      </section>

      {/* CONTACT */}
      <section className="home-contact" id="contact">
        <h2>Contact Us</h2>
        <p>Email: support@examsimulator.com</p>
        <p>For queries related to exams and access issues.</p>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <p>© 2026 Exam Simulator. All rights reserved.</p>
      </footer>
    </>
  );
}
