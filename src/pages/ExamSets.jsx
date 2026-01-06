import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../index.css";

export default function ExamSets() {
  const { examKey } = useParams();
  const navigate = useNavigate();
  const [examSets, setExamSets] = useState([]);
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamSets = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `http://localhost:5000/api/exams/${examKey}/sets`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch exam sets: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.success) {
          setExam(data.exam);
          setExamSets(data.data || []);
        } else {
          throw new Error(data.message || "Failed to fetch exam sets");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching exam sets:", err);
      } finally {
        setLoading(false);
      }
    };

    if (examKey) {
      fetchExamSets();
    }
  }, [examKey]);

  const handleSetClick = (setId) => {
    navigate(`/exam-set/${setId}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <Navbar />
      
      <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
              {exam ? exam.name : examKey?.toUpperCase() || "Exam"} Sets
            </h1>
            {exam && exam.description && (
              <p style={{ color: "#94a3b8", fontSize: "16px" }}>
                {exam.description}
              </p>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <p style={{ color: "#94a3b8", fontSize: "18px" }}>
                Loading exam sets...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <p style={{ color: "#ef4444", fontSize: "18px", marginBottom: "20px" }}>
                {error}
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
          )}

          {/* Empty State */}
          {!loading && !error && examSets.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <p style={{ color: "#94a3b8", fontSize: "18px", marginBottom: "20px" }}>
                No exam sets available for this exam.
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
          )}

          {/* Exam Sets Grid */}
          {!loading && !error && examSets.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "24px",
                marginTop: "30px",
              }}
            >
              {examSets.map((set) => (
                <div
                  key={set._id}
                  onClick={() => handleSetClick(set._id)}
                  style={{
                    background: "#020617",
                    padding: "24px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    border: "1px solid #334155",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(59, 130, 246, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <h3
                    style={{
                      fontSize: "20px",
                      marginBottom: "12px",
                      color: "#f8fafc",
                    }}
                  >
                    {set.title}
                  </h3>
                  
                  <div style={{ marginTop: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                        fontSize: "14px",
                        color: "#94a3b8",
                      }}
                    >
                      <span>Date:</span>
                      <span style={{ color: "#f8fafc", fontWeight: "500" }}>
                        {formatDate(set.date)}
                      </span>
                    </div>
                    
                    {set.shift && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "14px",
                          color: "#94a3b8",
                        }}
                      >
                        <span>Shift:</span>
                        <span style={{ color: "#f8fafc", fontWeight: "500" }}>
                          {set.shift}
                        </span>
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      marginTop: "20px",
                      paddingTop: "16px",
                      borderTop: "1px solid #334155",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "#3b82f6",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Click to view details →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
