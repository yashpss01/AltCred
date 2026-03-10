/**
 * Credit Score Service
 * Main orchestration service for credit score calculation
 */

const { supabase } = require('../../../config/supabase');
const { engineerFeatures } = require('./featureEngineering.service');
const { calculateCreditScore } = require('./mlModel.service');

/**
 * Fetch user's latest answers from database
 * @param {string} userId - User ID
 * @returns {Object} User answers
 */
async function fetchUserAnswers(userId) {
    const { data, error } = await supabase
        .from('user_answers')
        .select('answers')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (error) {
        // PGRST116 is the error code for "The result contains 0 rows" when using .single()
        if (error.code === 'PGRST116' || error.message.includes('Cannot coerce')) {
            throw new Error('No answers found for user');
        }
        throw new Error(`Failed to fetch user answers: ${error.message}`);
    }

    if (!data) {
        throw new Error('No answers found for user');
    }

    return data.answers;
}

/**
 * Save credit score to database
 * @param {string} userId - User ID
 * @param {Object} scoreData - Score calculation result
 * @returns {Object} Saved score record
 */
async function saveCreditScore(userId, scoreData) {
    const { data, error } = await supabase
        .from('credit_scores')
        .insert({
            user_id: userId,
            score: scoreData.score,
            factors: scoreData.factors,
            confidence: scoreData.confidence,
            calculated_at: new Date().toISOString(),
        })
        .select()
        .single();

    if (error) {
        throw new Error(`Failed to save credit score: ${error.message}`);
    }

    return data;
}

const { predictCreditScore } = require('../../../services/mlService');

/**
 * Map ML prediction category to a numeric base score
 * @param {string} category - "Poor", "Standard", "Good"
 * @returns {number} Base score
 */
function mapMLCategoryToScore(category) {
    const mapping = {
        'Poor': 400,
        'Standard': 650,
        'Good': 800
    };
    return mapping[category] || 600;
}

/**
 * Calculate hybrid score combining rule-based and ML results
 * @param {number} ruleScore - Score from rule engine
 * @param {string} mlCategory - Category from ML model
 * @returns {number} Hybrid score
 */
function calculateHybridScore(ruleScore, mlCategory) {
    const mlBaseScore = mapMLCategoryToScore(mlCategory);

    // Weights: Rule 40%, ML 60%
    const hybridScore = Math.round((ruleScore * 0.4) + (mlBaseScore * 0.6));

    // Ensure 300-850 range
    return Math.max(300, Math.min(850, hybridScore));
}

/**
 * Log prediction results to the database
 */
async function logPrediction(userId, data) {
    const { error } = await supabase
        .from('credit_predictions')
        .insert({
            user_id: userId,
            rule_score: data.ruleScore,
            ml_prediction: data.mlPrediction,
            ml_confidence: data.mlConfidence,
            final_score: data.finalScore,
            risk_category: data.riskCategory,
            created_at: new Date().toISOString()
        });

    if (error) {
        console.error('Failed to log prediction:', error.message);
        // Don't throw, logging failure shouldn't break the user flow
    }
}

/**
 * Calculate credit score for a user (Orchestrator)
 * @param {string} userId - User ID
 * @returns {Object} Credit score result
 */
async function calculateUserCreditScore(userId) {
    try {
        // 1. Fetch user's latest answers
        const answers = await fetchUserAnswers(userId);

        // 2. Engineer features from answers
        const features = engineerFeatures(answers);

        // 3. Rule-based scoring
        const ruleResult = calculateCreditScore(features);

        // 4. ML Prediction (FastAPI Call)
        console.log('Requesting ML prediction for user:', userId);
        const mlResult = await predictCreditScore(answers);

        let finalScore = ruleResult.score;
        let riskCategory = ruleResult.category;
        let mlMeta = { status: 'success' };

        if (mlResult.success) {
            // 5. Hybrid Scoring logic
            finalScore = calculateHybridScore(ruleResult.score, mlResult.prediction);
            // Re-evaluate category based on hybrid score
            const { getScoreCategory } = require('./mlModel.service');
            riskCategory = getScoreCategory(finalScore);
            mlMeta = {
                prediction: mlResult.prediction,
                confidence: mlResult.confidence,
                probabilities: mlResult.probabilities
            };
        } else {
            console.warn('ML Service failed, falling back to rule-based score');
            mlMeta = { status: 'failed', error: mlResult.error };
        }

        const finalResult = {
            ...ruleResult,
            rule_score: ruleResult.score,
            ml_meta: mlMeta,
            score: finalScore,
            category: riskCategory
        };

        // 6. Save main score to credit_scores table
        const savedScore = await saveCreditScore(userId, finalResult);

        // 7. Log detailed prediction (if table exists)
        if (mlResult.success) {
            await logPrediction(userId, {
                ruleScore: ruleResult.score,
                mlPrediction: mlResult.prediction,
                mlConfidence: mlResult.confidence,
                finalScore: finalScore,
                riskCategory: riskCategory
            });
        }

        // 8. Return complete result
        return {
            ...finalResult,
            id: savedScore.id,
            calculatedAt: savedScore.calculated_at,
        };
    } catch (error) {
        console.error('Error calculating credit score:', error);
        throw error;
    }
}

/**
 * Get user's latest credit score
 * @param {string} userId - User ID
 * @returns {Object} Latest credit score
 */
async function getLatestCreditScore(userId) {
    const { data, error } = await supabase
        .from('credit_scores')
        .select('*')
        .eq('user_id', userId)
        .order('calculated_at', { ascending: false })
        .limit(1)
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            return null; // No score found
        }
        throw new Error(`Failed to fetch credit score: ${error.message}`);
    }

    return data;
}

/**
 * Get user's credit score history
 * @param {string} userId - User ID
 * @param {number} limit - Number of records to fetch
 * @returns {Array} Credit score history
 */
async function getCreditScoreHistory(userId, limit = 10) {
    const { data, error } = await supabase
        .from('credit_scores')
        .select('*')
        .eq('user_id', userId)
        .order('calculated_at', { ascending: false })
        .limit(limit);

    if (error) {
        throw new Error(`Failed to fetch credit score history: ${error.message}`);
    }

    return data || [];
}

module.exports = {
    calculateUserCreditScore,
    getLatestCreditScore,
    getCreditScoreHistory,
    fetchUserAnswers,
    saveCreditScore,
};
