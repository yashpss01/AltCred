const axios = require('axios');

/**
 * ML Service Client
 * Communicates with the FastAPI inference service
 */

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

/**
 * Get credit score prediction from ML service
 * @param {Object} data - Financial features
 * @returns {Promise<Object>} Prediction result
 */
async function predictCreditScore(data) {
    const startTime = Date.now();
    try {
        const response = await axios.post(`${ML_SERVICE_URL}/predict-credit-score`, {
            age: data.age || 25,
            annual_income: data.monthlyIncome * 12,
            monthly_inhand_salary: data.monthlyIncome,
            num_bank_accounts: data.numBankAccounts || 1,
            num_credit_card: data.numCreditCards || 0,
            interest_rate: data.interestRate || 0,
            num_of_delayed_payment: data.num_of_delayed_payment || 0,
            outstanding_debt: data.outstandingDebt || 0,
            credit_utilization_ratio: data.credit_utilization_ratio || 30,
            total_emi_per_month: data.monthlyEmis || 0,
            monthly_balance: (data.monthlyIncome - (data.monthlyEmis || 0)) || 0,
            occupation: data.occupation || "Other",
            type_of_loan: data.pastLoanExperience || "None",
            credit_mix: data.credit_mix || "Standard",
            payment_of_min_amount: data.payment_of_min_amount || "No",
            payment_behaviour: data.payment_behaviour || "Low_spent_Small_value_payments"
        }, {
            timeout: 5000 // 5 second timeout
        });

        const latency = Date.now() - startTime;

        return {
            success: true,
            prediction: response.data.credit_score_category,
            confidence: response.data.confidence,
            probabilities: response.data.probabilities,
            model_version: response.data.model_version,
            explanation: response.data.explanation,
            latency_ms: latency
        };
    } catch (error) {
        console.error('ML Service Error:', error.message);
        return {
            success: false,
            error: error.message,
            fallback: true,
            latency_ms: Date.now() - startTime
        };
    }
}

/**
 * Check ML service health
 */
async function checkMLHealth() {
    try {
        const response = await axios.get(`${ML_SERVICE_URL}/health`);
        return response.data;
    } catch (error) {
        return { status: "unavailable" };
    }
}

module.exports = {
    predictCreditScore,
    checkMLHealth
};
