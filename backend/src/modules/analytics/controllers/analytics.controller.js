const analyticsService = require('../services/analytics.service');

async function getSummary(req, res, next) {
    try {
        const summary = await analyticsService.getPredictionsSummary();
        res.status(200).json({ success: true, data: summary });
    } catch (error) {
        next(error);
    }
}

async function getDistribution(req, res, next) {
    try {
        const distribution = await analyticsService.getRiskDistribution();
        res.status(200).json({ success: true, data: distribution });
    } catch (error) {
        next(error);
    }
}

async function getPerformance(req, res, next) {
    try {
        const performance = await analyticsService.getModelPerformance();
        res.status(200).json({ success: true, data: performance });
    } catch (error) {
        next(error);
    }
}

async function getHealth(req, res, next) {
    try {
        const health = await analyticsService.getSystemHealth();
        res.status(200).json({ success: true, data: health });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getSummary,
    getDistribution,
    getPerformance,
    getHealth
};
