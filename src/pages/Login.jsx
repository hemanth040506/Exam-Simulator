
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
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
        transition: "border 0.2s",
    },
    button: {
        marginTop: "10px",
        padding: "14px",
        borderRadius: "12px",
        background: "#3b82f6",
        color: "#fff",
        border: "none",
        fontSize: "1rem",
        fontWeight: "600",
        cursor: "pointer",
        transition: "background 0.2s",
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

const Login = ({ setUser }) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please enter both email and password");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            // Success
            localStorage.setItem("token", data.token);
            // Pass user data up to App.js
            setUser(data.user);
            navigate("/home");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Welcome Back</h2>
                <p style={styles.subtitle}>Enter your credentials to access your account</p>
                {error && <div style={{ color: "#ef4444", marginBottom: "16px", textAlign: "center" }}>{error}</div>}

                <form style={styles.form} onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input
                            type="email"
                            style={styles.input}
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            style={styles.input}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{ ...styles.button, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                        onMouseOver={(e) => { if (!loading) e.target.style.background = "#2563eb"; }}
                        onMouseOut={(e) => { if (!loading) e.target.style.background = "#3b82f6"; }}
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <div style={styles.footer}>
                    Don't have an account?{" "}
                    <span style={styles.link} onClick={() => navigate("/signup")}>
                        Sign up
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
