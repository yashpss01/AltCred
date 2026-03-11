"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import styles from "../styles/Dashboard.module.css";
import { API_ENDPOINTS, apiClient } from "../utils/api";

export default function Dashboard() {
    const router = useRouter();
    const [scoreData, setScoreData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchScore();
    }, []);

    const fetchScore = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                router.push('/login');
                return;
            }

            // Try to get latest score first
            try {
                const response = await apiClient.get(API_ENDPOINTS.CREDIT_SCORE.GET_LATEST, token);
                setScoreData(response.data);
            } catch (err) {
                // If no score found, try calculating it
                if (err.message.includes('No credit score found')) {
                    const calcResponse = await apiClient.post(API_ENDPOINTS.CREDIT_SCORE.CALCULATE, {}, token);
                    setScoreData(calcResponse.data);
                } else {
                    throw err;
                }
            }
        } catch (err) {
            console.warn('Error fetching score:', err.message);
            if (err.message.includes('Please complete the financial assessment first')) {
                setError("Please complete your financial assessment to view your credit score.");
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= SCORE_THRESHOLDS.EXCELLENT) return '#4ade80'; // Green
        if (score >= SCORE_THRESHOLDS.GOOD) return '#60a5fa'; // Blue
        if (score >= SCORE_THRESHOLDS.FAIR) return '#fbbf24'; // Yellow
        return '#f87171'; // Red
    };

    if (loading) {
        return (
            <div className={styles['loading-container']}>
                <div style={backgroundStyle}></div>
                <p>Analyzing your financial profile...</p>
            </div>
        );
    }

    const scoreColor = scoreData ? getScoreColor(scoreData.score) : '#fff';

    return (
        <div style={backgroundStyle}>
            <Navbar />
            <div className={styles['dashboard-container']} style={{ paddingTop: '120px' }}>
                <header className={styles['dashboard-header']}>
                    <div className={styles['welcome-text']}>
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            Your Credit Profile
                        </motion.h1>
                        <p>Real-time analysis based on alternative data</p>
                    </div>
                    <button
                        className={styles['action-btn']}
                        onClick={() => router.push('/financial-assessment')}
                    >
                        Update Profile
                    </button>
                </header>

                {error ? (
                    <div className="text-center text-red-400 p-8 bg-red-900/20 rounded-xl border border-red-500/30">
                        <p>{error}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30"
                            onClick={() => router.push('/financial-assessment')}
                        >
                            Take Assessment
                        </button>
                    </div>
                ) : scoreData && (
                    <div className={styles['score-section']}>
                        {/* Main Score Card */}
                        <motion.div
                            className={styles['score-card']}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div
                                className={styles['score-circle']}
                                style={{ borderColor: `${scoreColor}40` }}
                            >
                                <motion.span
                                    className={styles['score-value']}
                                    style={{ color: scoreColor }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    {scoreData.score}
                                </motion.span>
                                <span className={styles['score-label']}>Credit Score</span>
                            </div>

                            <div
                                className={styles['score-category']}
                                style={{ color: scoreColor, background: `${scoreColor}15` }}
                            >
                                {getScoreCategory(scoreData.score)}
                            </div>

                            <div className="mt-6 text-center text-gray-400 text-sm">
                                <p>Confidence Score: {Math.round(scoreData.confidence * 100)}%</p>
                                <p>Last updated: {new Date(scoreData.calculatedAt).toLocaleDateString()}</p>
                            </div>
                        </motion.div>

                        {/* Factors Grid */}
                        <div className={styles['factors-grid']}>
                            {Object.entries(scoreData.factors).map(([key, factor], index) => (
                                <motion.div
                                    key={key}
                                    className={styles['factor-card']}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + (index * 0.1) }}
                                >
                                    <div className={styles['factor-header']}>
                                        <span className={styles['factor-title']}>
                                            {formatFactorName(key)}
                                        </span>
                                        <span className={styles['factor-weight']}>
                                            {factor.weight}% Impact
                                        </span>
                                    </div>

                                    <div className={styles['progress-bar']}>
                                        <motion.div
                                            className={styles['progress-fill']}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${factor.score}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            style={{
                                                background: `linear-gradient(90deg, ${scoreColor}, ${scoreColor}80)`
                                            }}
                                        />
                                    </div>

                                    <div className={styles['factor-score']}>
                                        {factor.score}/100
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Helper functions
const backgroundStyle = {
    minHeight: '100vh',
    backgroundColor: '#0a0a0f',
    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)',
    backgroundSize: '18px 18px',
    animation: 'dots-move 14s linear infinite',
    position: 'relative'
};

function getScoreCategory(score) {
    if (score >= 750) return 'Excellent';
    if (score >= 650) return 'Good';
    if (score >= 550) return 'Fair';
    if (score >= 450) return 'Poor';
    return 'Very Poor';
}

function formatFactorName(key) {
    const names = {
        paymentHistory: 'Payment History',
        financialStability: 'Financial Stability',
        incomeFactors: 'Income & Employment',
        responsibility: 'Financial Responsibility'
    };
    return names[key] || key;
}
