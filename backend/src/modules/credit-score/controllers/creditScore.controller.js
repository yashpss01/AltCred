const {
    calculateUserCreditScore,
    getLatestCreditScore,
    getCreditScoreHistory,
} = require('../services/creditScore.service');

async function calculateScore(req, res, next) {
    try {
        const uid = req.user.id;

        
        const scoreResult = await calculateUserCreditScore(uid);

        res.status(200).json({
            success: true,
            message: 'Credit score calculated successfully',
            data: {
                score: scoreResult.score,
                category: scoreResult.category,
                confidence: scoreResult.confidence,
                factors: scoreResult.factors,
                calculatedAt: scoreResult.calculatedAt,
            },
        });
    } catch (error) {
        console.error('Error in calculateScore:', error);

        if (error.message.includes('No answers found')) {
            return res.status(404).json({
                success: false,
                message: 'Please complete the financial assessment first',
            });
        }

        next(error);
    }
}

/**
 * Get latest credit score for authenticated user
 * GET /api/v1/credit-score
 */
async function getScore(req, res, next) {
    try {
        const userId = req.user.id;

        const score = await getLatestCreditScore(userId);

        if (!score) {
            return res.status(404).json({
                success: false,
                message: 'No credit score found. Please calculate your score first.',
            });
        }

        res.status(200).json({
            success: true,
            data: {
                score: score.score,
                factors: score.factors,
                confidence: score.confidence,
                calculatedAt: score.calculated_at,
            },
        });
    } catch (error) {
        console.error('Error in getScore:', error);
        next(error);
    }
}

async function getScoreHistory(req, res, next) {
    try {
        const userId = req.user.id;
        const limit = parseInt(req.query.limit) || 10;

        const history = await getCreditScoreHistory(userId, limit);

        res.status(200).json({
            success: true,
            data: {
                count: history.length,
                scores: history.map(score => ({
                    score: score.score,
                    confidence: score.confidence,
                    calculatedAt: score.calculated_at,
                })),
            },
        });
    } catch (error) {
        console.error('Error in getScoreHistory:', error);
        next(error);
    }
}

module.exports = {
    calculateScore,
    getScore,
    getScoreHistory,
};
