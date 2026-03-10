const express = require('express');
const router = express.Router();
const { authGaurd } = require('../../auth/middlewares/auth.guard');
const {
    getSummary,
    getDistribution,
    getPerformance,
    getHealth
} = require('../controllers/analytics.controller');

// All analytics routes require authentication (admin level ideally, but authGaurd for simplicity)
router.get('/predictions-summary', authGaurd, getSummary);
router.get('/risk-distribution', authGaurd, getDistribution);
router.get('/model-performance', authGaurd, getPerformance);
router.get('/system-health', authGaurd, getHealth);

module.exports = router;
