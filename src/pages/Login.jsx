
import React, { useState } from 'react';

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

const Login = ({ onLogin, onSwitchToSignup }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login
        if (email && password) {
            onLogin({ name: email.split("@")[0], email });
        } else {
            alert("Please enter valid credentials");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Welcome Back</h2>
                <p style={styles.subtitle}>Enter your credentials to access your account</p>

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
                        style={styles.button}
                        onMouseOver={(e) => e.target.style.background = "#2563eb"}
                        onMouseOut={(e) => e.target.style.background = "#3b82f6"}
                    >
                        Sign In
                    </button>
                </form>

                <div style={styles.footer}>
                    Don't have an account?{" "}
                    <span style={styles.link} onClick={onSwitchToSignup}>
                        Sign up
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
