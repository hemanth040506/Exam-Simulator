
import React from 'react';

const styles = {
    nav: {
        padding: "20px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        boxSizing: "border-box",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 10,
        background: "linear-gradient(to bottom, rgba(15, 23, 42, 0.9), transparent)",
    },
    brand: {
        fontSize: "1.5rem",
        fontWeight: "700",
        color: "#fff",
        cursor: "pointer",
    },
    gradientText: {
        background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },
    rightSection: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
    },
    link: {
        color: "#cbd5e1",
        textDecoration: "none",
        fontSize: "0.95rem",
        fontWeight: "500",
        cursor: "pointer",
        transition: "color 0.2s",
    },
    primaryBtn: {
        padding: "8px 20px",
        borderRadius: "8px",
        background: "#3b82f6",
        color: "#fff",
        border: "none",
        fontWeight: "600",
        cursor: "pointer",
        fontSize: "0.9rem",
    },
    userProfile: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },
    avatar: {
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        background: "#3b82f6",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700",
        fontSize: "1rem",
    }
};

const Navbar = ({ user, onNavigate, onLogout }) => {
    return (
        <nav style={styles.nav}>
            <div style={styles.brand} onClick={() => onNavigate('home')}>
                <span style={styles.gradientText}>Gate</span> Simulator
            </div>

            <div style={styles.rightSection}>
                {user ? (
                    <div style={styles.userProfile}>
                        <span style={styles.link}>Dashboard</span>
                        <div style={styles.avatar}>
                            {user.name ? user.name[0].toUpperCase() : 'U'}
                        </div>
                        <button
                            style={{ ...styles.link, background: 'none', border: 'none' }}
                            onClick={onLogout}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <>
                        <span style={styles.link} onClick={() => onNavigate('login')}>Sign In</span>
                        <button style={styles.primaryBtn} onClick={() => onNavigate('signup')}>
                            Get Started
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
