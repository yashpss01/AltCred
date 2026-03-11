"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/FinancialAssessment.module.css";
import Navbar from "../components/Navbar.jsx";
import { QUESTIONS } from "../utils/questions";
import { QuestionCard } from "../components/QuestionCard.jsx";
import { API_ENDPOINTS, apiClient } from "../utils/api";

export default function FinancialAssessment() {
    const router = useRouter();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);
    const [success, setSuccess] = useState(false);

    function handleChange(id, val) {
        setData(prev => ({ ...prev, [id]: val }));
        if (err) setErr(null);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErr(null);
        setSuccess(false);

        const missing = QUESTIONS.filter(q => !data[q.id]);

        if (missing.length > 0) {
            setErr(`Please complete all fields. Missing: ${missing.length}`);
            setLoading(false);
            return;
        }

        try {
            // Get JWT token from localStorage (assuming user is logged in)
            const token = localStorage.getItem('accessToken');

            if (!token) {
                setErr("Please log in to submit your assessment.");
                setLoading(false);
                // Redirect to login after 2 seconds
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
                return;
            }

            // Submit to backend
            await apiClient.post(
                API_ENDPOINTS.INTAKE.SAVE_ANSWERS,
                { answers: data },
                token
            );

            // Trigger score calculation immediately
            await apiClient.post(
                API_ENDPOINTS.CREDIT_SCORE.CALCULATE,
                {},
                token
            );

            setSuccess(true);

            // Show success message
            alert("Assessment saved! Your new credit score has been calculated.");

            // Optionally redirect to dashboard after 2 seconds
            setTimeout(() => {
                router.push('/dashboard');
            }, 2000);

        } catch (error) {
            console.error("Submission error:", error);
            setErr(error.message || "Submission failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#0a0a0f',
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
            animation: 'dots-move 14s linear infinite',
            position: 'relative'
        }}>
            <Navbar />
            <div className={styles['fa-container']} style={{ paddingTop: '120px' }}>
                <header className={styles['fa-header']}>
                    <h1 className={styles['fa-title']}>Financial Health Assessment</h1>
                    <p className={styles['fa-subtitle']}>
                        Just a few questions to help us get a better picture of where you stand financially.
                    </p>
                </header>

                <form className={styles['fa-form']} onSubmit={onSubmit}>
                    {QUESTIONS.map((q) => (
                        <QuestionCard
                            key={q.id}
                            questionData={q}
                            currentAnswer={data[q.id] || ""}
                            onAnswerChange={handleChange}
                        />
                    ))}

                    {err && <div className={styles['fa-error-msg']}>{err}</div>}
                    {success && (
                        <div className={styles['fa-success-msg']}>
                            ✓ Assessment saved successfully! Redirecting...
                        </div>
                    )}

                    <button
                        type="submit"
                        className={styles['fa-submit-btn']}
                        disabled={loading || success}
                    >
                        {loading ? "Saving..." : success ? "Saved ✓" : "Submit Assessment"}
                    </button>
                </form>
            </div>
        </div>
    );
}
