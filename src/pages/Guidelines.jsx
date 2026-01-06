import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../index.css";

export default function Guidelines() {
  const { setId } = useParams();
  const navigate = useNavigate();
  const [examSet, setExamSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamSet = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:5000/api/exam-sets/${setId}`
        );

        if (!response.ok) {
          // Try to get error message from response
          let errorMessage = `Failed to fetch exam set: ${response.statusText}`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch (e) {
            // If response is not JSON, use status text
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();

        if (data.success) {
          setExamSet(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch exam set details");
        }
      } catch (err) {
        // Handle network errors vs API errors
        if (err.name === 'TypeError' && err.message.includes('fetch')) {
          setError("Cannot connect to server. Please make sure the backend is running on http://localhost:5000");
        } else {
          setError(err.message || "An error occurred while fetching exam set details");
        }
        console.error("Error fetching exam set:", err);
      } finally {
        setLoading(false);
      }
    };

    if (setId) {
      fetchExamSet();
    } else {
      setError("No exam set ID provided");
      setLoading(false);
    }
  }, [setId]);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0 && mins > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ${mins} minute${mins > 1 ? "s" : ""}`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else {
      return `${mins} minute${mins > 1 ? "s" : ""}`;
    }
  };

  const handleStartExam = () => {
    navigate(`/exam/start/${setId}`);
  };

  const handleGoBack = () => {
    if (examSet?.exam?.key) {
      navigate(`/exam/${examSet.exam.key}`);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
          {/* Loading State */}
          {loading && (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <p style={{ color: "#94a3b8", fontSize: "18px" }}>
                Loading guidelines...
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
                onClick={handleGoBack}
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
                Go Back
              </button>
            </div>
          )}

          {/* Guidelines Content */}
          {!loading && !error && examSet && (
            <>
              {/* Header */}
              <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
                  {examSet.title}
                </h1>
                {examSet.exam && (
                  <p style={{ color: "#94a3b8", fontSize: "16px" }}>
                    {examSet.exam.name}
                    {examSet.exam.description && ` - ${examSet.exam.description}`}
                  </p>
                )}
              </div>

              {/* Exam Details Card */}
              <div
                style={{
                  background: "#020617",
                  padding: "30px",
                  borderRadius: "12px",
                  marginBottom: "24px",
                  border: "1px solid #334155",
                }}
              >
                <h2
                  style={{
                    fontSize: "24px",
                    marginBottom: "20px",
                    color: "#f8fafc",
                  }}
                >
                  Exam Details
                </h2>

                {examSet.pattern && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "16px",
                      padding: "12px",
                      background: "#1e293b",
                      borderRadius: "8px",
                    }}
                  >
                    <span style={{ color: "#94a3b8", fontSize: "16px" }}>
                      Duration:
                    </span>
                    <span
                      style={{
                        color: "#3b82f6",
                        fontSize: "18px",
                        fontWeight: "600",
                      }}
                    >
                      {formatDuration(examSet.pattern.duration)}
                    </span>
                  </div>
                )}
              </div>

              {/* Sections Card */}
              {examSet.pattern && examSet.pattern.sections && examSet.pattern.sections.length > 0 && (
                <div
                  style={{
                    background: "#020617",
                    padding: "30px",
                    borderRadius: "12px",
                    marginBottom: "24px",
                    border: "1px solid #334155",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "24px",
                      marginBottom: "20px",
                      color: "#f8fafc",
                    }}
                  >
                    Sections
                  </h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {examSet.pattern.sections.map((section, index) => (
                      <div
                        key={index}
                        style={{
                          padding: "20px",
                          background: "#1e293b",
                          borderRadius: "8px",
                          border: "1px solid #334155",
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "18px",
                            marginBottom: "12px",
                            color: "#f8fafc",
                          }}
                        >
                          {section.name}
                        </h3>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                            gap: "12px",
                            fontSize: "14px",
                          }}
                        >
                          <div>
                            <span style={{ color: "#94a3b8" }}>Questions: </span>
                            <span style={{ color: "#f8fafc", fontWeight: "500" }}>
                              {section.questionCount}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: "#94a3b8" }}>Marks per Question: </span>
                            <span style={{ color: "#22c55e", fontWeight: "500" }}>
                              +{section.marksPerQuestion}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: "#94a3b8" }}>Negative Marks: </span>
                            <span style={{ color: "#ef4444", fontWeight: "500" }}>
                              -{section.negativeMarks}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructions Card */}
              {examSet.pattern && examSet.pattern.instructions && examSet.pattern.instructions.length > 0 && (
                <div
                  style={{
                    background: "#020617",
                    padding: "30px",
                    borderRadius: "12px",
                    marginBottom: "24px",
                    border: "1px solid #334155",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "24px",
                      marginBottom: "20px",
                      color: "#f8fafc",
                    }}
                  >
                    Instructions
                  </h2>

                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {examSet.pattern.instructions.map((instruction, index) => (
                      <li
                        key={index}
                        style={{
                          padding: "12px 16px",
                          background: "#1e293b",
                          borderRadius: "8px",
                          color: "#cbd5e1",
                          fontSize: "15px",
                          lineHeight: "1.6",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "12px",
                        }}
                      >
                        <span
                          style={{
                            color: "#3b82f6",
                            fontWeight: "700",
                            fontSize: "18px",
                            lineHeight: "1.2",
                          }}
                        >
                          •
                        </span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  justifyContent: "center",
                  marginTop: "40px",
                }}
              >
                <button
                  onClick={handleGoBack}
                  style={{
                    padding: "12px 32px",
                    borderRadius: "8px",
                    background: "transparent",
                    color: "#cbd5e1",
                    border: "1px solid #334155",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#64748b";
                    e.currentTarget.style.color = "#f8fafc";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#334155";
                    e.currentTarget.style.color = "#cbd5e1";
                  }}
                >
                  Go Back
                </button>
                <button
                  onClick={handleStartExam}
                  style={{
                    padding: "12px 32px",
                    borderRadius: "8px",
                    background: "#3b82f6",
                    color: "#fff",
                    border: "none",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#2563eb";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#3b82f6";
                  }}
                >
                  Start Exam
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
