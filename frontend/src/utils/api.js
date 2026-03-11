// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://altcred-backend.onrender.com';

export const API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        REGISTER: `${API_BASE_URL}/api/v1/auth/register`,
        LOGIN: `${API_BASE_URL}/api/v1/auth/login`,
        ME: `${API_BASE_URL}/api/v1/auth/me`,
    },
    // Intake endpoints
    INTAKE: {
        SAVE_ANSWERS: `${API_BASE_URL}/api/v1/intake/answers`,
    },
    // Credit Score endpoints
    CREDIT_SCORE: {
        CALCULATE: `${API_BASE_URL}/api/v1/credit-score/calculate`,
        GET_LATEST: `${API_BASE_URL}/api/v1/credit-score`,
        HISTORY: `${API_BASE_URL}/api/v1/credit-score/history`,
    },
};

// API client helper
export const apiClient = {
    async post(url, data, token = null) {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            const error = new Error(result.message || 'Request failed');
            error.response = result
            throw error;
        }

        return result;
    },

    async get(url, token = null) {
        const headers = {};

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            method: 'GET',
            headers,
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Request failed');
        }

        return result;
    },
};
