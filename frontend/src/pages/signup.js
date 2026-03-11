"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import styles from "../styles/Auth.module.css";
import { API_ENDPOINTS, apiClient } from "../utils/api";
import { saveToken } from "../utils/auth";

export default function Signup() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            setLoading(false);
            return;
        }

        try {
            const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, {
                full_name: formData.full_name,
                email: formData.email,
                password: formData.password,
            });

            if (response.user && response.accessToken) {
                // Save token
                saveToken(response.accessToken);
                // Redirect to dashboard
                router.push("/dashboard");
            } else {
                throw new Error("Registration failed");
            }
        } catch (err) {
            console.warn("Signup attempt failed:", err.message);
            if (err.response) {
                setError(err.response.message || "Registration failed. Please try again.");
            } else {
                setError(err.message || "Registration failed. Please check your details and try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={backgroundStyle}>
            <Navbar />
            <div className={styles["auth-container"]}>
                <motion.div
                    className={styles["auth-card"]}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className={styles["auth-header"]}>
                        <h1 className={styles["auth-title"]}>Create Account</h1>
                        <p className={styles["auth-subtitle"]}>Join AltCred and discover your true credit score</p>
                    </div>

                    {error && (
                        <motion.div
                            className={styles["error-msg"]}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                        >
                            {error}
                        </motion.div>
                    )}

                    <form className={styles["auth-form"]} onSubmit={handleSubmit}>
                        <div className={styles["form-group"]}>
                            <label htmlFor="full_name" className={styles["form-label"]}>Full Name</label>
                            <input
                                type="text"
                                id="full_name"
                                name="full_name"
                                className={styles["form-input"]}
                                placeholder="John Doe"
                                value={formData.full_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles["form-group"]}>
                            <label htmlFor="email" className={styles["form-label"]}>Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={styles["form-input"]}
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles["form-group"]}>
                            <label htmlFor="password" className={styles["form-label"]}>Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={styles["form-input"]}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles["form-group"]}>
                            <label htmlFor="confirmPassword" className={styles["form-label"]}>Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className={styles["form-input"]}
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={styles["submit-btn"]}
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <div className={styles["auth-footer"]}>
                        Already have an account?
                        <Link href="/login" className={styles["auth-link"]}>
                            Sign in
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

const backgroundStyle = {
    minHeight: '100vh',
    backgroundColor: '#0a0a0f',
    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)',
    backgroundSize: '18px 18px',
    animation: 'dots-move 14s linear infinite',
    position: 'relative'
};
