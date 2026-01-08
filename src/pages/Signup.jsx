import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f172a",
        color: "#cbd5e1",
        padding: "20px",
    },
    card: {
        background: "#1e293b",
        padding: "40px",
        borderRadius: "24px",
        border: "1px solid #334155",
        width: "100%",
        maxWidth: "400px",
        boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
    title: {
        fontSize: "2rem",
        fontWeight: "700",
        color: "#f8fafc",
        marginBottom: "8px",
        textAlign: "center",
    },
    subtitle: {
        textAlign: "center",
        marginBottom: "32px",
        color: "#94a3b8",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    label: {
        fontSize: "0.9rem",
        fontWeight: "600",
        color: "#e2e8f0",
    },
    input: {
        padding: "12px 16px",
        borderRadius: "12px",
        background: "#0f172a",
        border: "1px solid #334155",
        color: "#fff",
        fontSize: "1rem",
        outline: "none",
    },
    button: {
        marginTop: "10px",
        padding: "14px",
        borderRadius: "12px",
        background: "#22c55e",
        color: "#fff",
        border: "none",
        fontSize: "1rem",
        fontWeight: "600",
        cursor: "pointer",
    },
    footer: {
        marginTop: "24px",
        textAlign: "center",
        fontSize: "0.9rem",
    },
    link: {
        color: "#3b82f6",
        cursor: "pointer",
        fontWeight: "500",
    },
};

const Signup = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!name || !email || !password) {
            setError("All fields are required");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/api/auth/signup",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Signup failed");
            }

            // Save token
            localStorage.setItem("token", data.token);

            // Redirect to login (or dashboard later)
            navigate("/login");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Create Account</h2>
                <p style={styles.subtitle}>
                    Get started with your exam prep today
                </p>

                {error && (
                    <div
                        style={{
                            color: "#ef4444",
                            marginBottom: "16px",
                            textAlign: "center",
                        }}
                    >
                        {error}
                    </div>
                )}

                <form style={styles.form} onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Full Name</label>
                        <input
                            type="text"
                            style={styles.input}
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input
                            type="email"
                            style={styles.input}
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            style={styles.input}
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...styles.button,
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? "not-allowed" : "pointer",
                        }}
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <div style={styles.footer}>
                    Already have an account?{" "}
                    <span
                        style={styles.link}
                        onClick={() => navigate("/login")}
                    >
                        Sign in
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Signup;
