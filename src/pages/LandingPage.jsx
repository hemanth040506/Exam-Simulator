
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const styles = {
    hero: {
        textAlign: 'center',
        padding: '160px 20px 100px',
        background: 'linear-gradient(180deg, #020617, #0f172a)',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: '3.5rem',
        fontWeight: '800',
        marginBottom: '24px',
        background: 'linear-gradient(to right, #60a5fa, #a855f7)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    subtitle: {
        color: '#94a3b8',
        fontSize: '1.25rem',
        maxWidth: '700px',
        lineHeight: '1.6',
        marginBottom: '48px',
    },
    ctaButton: {
        padding: '16px 40px',
        fontSize: '1.1rem',
        fontWeight: '600',
        color: '#fff',
        background: '#3b82f6',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '0 8px 16px -4px rgba(59, 130, 246, 0.4)',
        transition: 'all 0.2s',
    },
    section: {
        padding: '100px 40px',
        background: '#020617',
        borderTop: '1px solid #1e293b',
    },
    sectionTitle: {
        fontSize: '2.5rem',
        textAlign: 'center',
        marginBottom: '60px',
        color: '#f8fafc',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    card: {
        background: '#1e293b',
        padding: '40px',
        borderRadius: '16px',
        border: '1px solid #334155',
        transition: 'transform 0.2s',
    },
    cardTitle: {
        fontSize: '1.5rem',
        marginBottom: '16px',
        color: '#fff',
    },
    cardText: {
        color: '#94a3b8',
        lineHeight: '1.8',
        fontSize: '1.05rem',
    },
    // Exam List Styles
    examList: {
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '60px',
    },
    examItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '60px',
        justifyContent: 'space-between',
    },
    examCard: {
        flex: '0 0 300px',
        height: '200px',
        background: '#1e293b',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        fontWeight: '700',
        color: '#fff',
        border: '1px solid #334155',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    examContent: {
        flex: 1,
    },
    examTitle: {
        fontSize: '2rem',
        fontWeight: '700',
        marginBottom: '16px',
        color: '#f8fafc',
    },
    examDesc: {
        color: '#94a3b8',
        lineHeight: '1.7',
        fontSize: '1.1rem',
        marginBottom: '24px',
    },
    link: {
        color: '#3b82f6',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
    },
    footer: {
        textAlign: 'center',
        padding: '40px',
        background: '#0f172a',
        borderTop: '1px solid #1e293b',
        color: '#64748b',
    }
};

export default function LandingPage({ user, onLogout }) {
    const navigate = useNavigate();

    return (
        <div style={{ background: '#0f172a', minHeight: '100vh', color: '#fff' }}>
            <Navbar user={user} onLogout={onLogout} />

            {/* HERO */}
            <section style={styles.hero}>
                <div style={{ maxWidth: '900px' }}>
                    <h1 style={styles.title}>Ace Your Competitive Exams</h1>
                    <p style={styles.subtitle}>
                        The ultimate examination simulator for GATE, JEE, and EAMCET aspirants.
                        Practice in a realistic environment, analyze your performance, and secure your rank.
                    </p>
                    <button
                        style={styles.ctaButton}
                        onClick={() => navigate('/home')}
                        onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        Get Started
                    </button>
                </div>
            </section>

            {/* ABOUT COMPETITIVE EXAMS */}
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Supported Examinations</h2>
                <div style={styles.examList}>

                    {/* GATE */}
                    <div style={styles.examItem}>
                        <div style={{ ...styles.examCard, borderLeft: '4px solid #3b82f6' }}>GATE</div>
                        <div style={styles.examContent}>
                            <h3 style={styles.examTitle}>Graduate Aptitude Test in Engineering</h3>
                            <p style={styles.examDesc}>
                                A premier examination for engineering graduates to secure admissions in IITs/NITs and jobs in PSUs.
                                Our simulator mimics the exact GATE interface with Calculator and Scribble Pad support.
                            </p>
                            <a href="https://gate2024.iisc.ac.in/" target="_blank" rel="noreferrer" style={styles.link}>
                                Visit Official Website &rarr;
                            </a>
                        </div>
                    </div>

                    {/* JEE */}
                    <div style={{ ...styles.examItem, flexDirection: 'row-reverse' }}>
                        <div style={{ ...styles.examCard, borderLeft: '4px solid #ef4444' }}>JEE</div>
                        <div style={styles.examContent}>
                            <h3 style={styles.examTitle}>Joint Entrance Examination</h3>
                            <p style={styles.examDesc}>
                                The gateway to India's top engineering colleges like IITs and NITs.
                                Practice both Mains and Advanced patterns with precise marking schemes.
                            </p>
                            <a href="https://jeemain.nta.ac.in/" target="_blank" rel="noreferrer" style={styles.link}>
                                Visit Official Website &rarr;
                            </a>
                        </div>
                    </div>

                    {/* EAMCET */}
                    <div style={styles.examItem}>
                        <div style={{ ...styles.examCard, borderLeft: '4px solid #22c55e' }}>EAMCET</div>
                        <div style={styles.examContent}>
                            <h3 style={styles.examTitle}>EAMCET</h3>
                            <p style={styles.examDesc}>
                                Engineering Agricultural and Medical Common Entrance Test.
                                Master speed and accuracy required for state-level entrance exams.
                            </p>
                            <a href="https://cets.apsche.ap.gov.in/EAPCET/" target="_blank" rel="noreferrer" style={styles.link}>
                                Visit Official Website &rarr;
                            </a>
                        </div>
                    </div>

                </div>
            </section>

            {/* FEATURES */}
            <section style={{ ...styles.section, background: '#0f172a' }}>
                <h2 style={styles.sectionTitle}>Why This Platform?</h2>
                <div style={styles.grid}>
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Real Exam Interface</h3>
                        <p style={styles.cardText}>
                            Experience the exact button layout, color codes, and timer behavior used in actual TCS iON centers.
                        </p>
                    </div>
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>MCQ, MSQ & NAT</h3>
                        <p style={styles.cardText}>
                            Full support for Multiple Choice, Multiple Select, and Numerical Answer Type questions with virtual keyboard validation.
                        </p>
                    </div>
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Detailed Analytics</h3>
                        <p style={styles.cardText}>
                            Get subject-wise breakdown, time spent analytics, and accuracy reports to identify your weak areas immediately.
                        </p>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer style={styles.footer}>
                <p>&copy; 2026 GATE Exam Simulator. Built for Excellence.</p>
            </footer>
        </div>
    );
}
