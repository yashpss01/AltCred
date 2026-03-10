const { intakeData } = require("../services/intake.service")
const { supabase } = require("../../../config/supabase")
const { calculateUserCreditScore } = require("../../credit-score/services/creditScore.service")

async function saveAnswers(req, res, next) {
  try {
    const userId = req.user.id;
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        userId: userId
      })
    }

    // 1. Store the answers
    const stored = await intakeData(userId, req.body.answers);

    // 2. Trigger Hybrid Credit Scoring
    console.log('Intake complete, triggering hybrid scoring for:', userId);
    const scoreResult = await calculateUserCreditScore(userId);

    // 3. Return combined response
    res.status(201).json({
      success: true,
      message: 'Assessment submitted and score calculated',
      data: {
        intake: stored,
        score: scoreResult.score,
        category: scoreResult.category,
        confidence: scoreResult.ml_meta?.confidence || scoreResult.confidence,
        rule_score: scoreResult.rule_score,
        ml_prediction: scoreResult.ml_meta?.prediction || "N/A",
        final_score: scoreResult.score,
        risk_category: scoreResult.category
      }
    });

  } catch (err) {
    console.error('Error in saveAnswers/calculate:', err)
    next(err)
  }
}

module.exports = { saveAnswers };
