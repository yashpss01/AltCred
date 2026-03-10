const { supabase } = require("../../../config/supabase");

function sanitize(text, max = 100) {
  return String(text || "").replace(/[<>$'";]/g, "").trim().slice(0, max)
}

function refineAns(raw) {
  return {
    employmentStability: sanitize(raw.employmentStability, 30),
    monthlyIncome: Math.max(0, Number(raw.monthlyIncome)),
    incomeStability: sanitize(raw.incomeStability, 30),
    savingsBuffer: sanitize(raw.savingsBuffer, 20),
    expenseRatio: sanitize(raw.expenseRatio, 10),
    loanExperience: sanitize(raw.loanExperience, 40),
    billDiscipline: sanitize(raw.billDiscipline, 25),
    dependents: Math.min(10, Number(raw.dependents)),
    educationLevel: sanitize(raw.educationLevel, 25),
    financialDiscipline: sanitize(raw.financialDiscipline, 15),
    // ML Specific
    age: Number(raw.age) || 25,
    num_bank_accounts: Number(raw.num_bank_accounts) || 1,
    num_credit_card: Number(raw.num_credit_card) || 1,
    interest_rate: Number(raw.interest_rate) || 10,
    num_of_delayed_payment: Number(raw.num_of_delayed_payment) || 0,
    outstanding_debt: Number(raw.outstanding_debt) || 0,
    credit_utilization_ratio: Number(raw.credit_utilization_ratio) || 30,
    total_emi_per_month: Number(raw.total_emi_per_month) || 0,
    monthly_balance: Number(raw.monthly_balance) || 500,
    occupation: sanitize(raw.occupation, 30) || "Other",
    credit_mix: sanitize(raw.credit_mix, 20) || "Standard",
    payment_of_min_amount: sanitize(raw.payment_of_min_amount, 5) || "No",
    payment_behaviour: sanitize(raw.payment_behaviour, 50) || "Low_spent_Small_value_payments"
  }
}
async function intakeData(userId, rawAnswers) {
  try {
    const clean = refineAns(rawAnswers);
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single()

    if (userError || !user) {
      console.error('User verification failed:', { userId, userError, user });
      throw new Error(`User verification failed: ${userError?.message || 'User not found'}`);
    }

    const { data, error } = await supabase
      .from("user_answers")
      .insert({
        user_id: userId,
        answers: clean,
        created_at: new Date().toISOString(),
      })
      .select("id, user_id, created_at")
      .single();

    if (error) {
      console.error('Supabase insert error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
        userId
      });
      throw new Error(`DB Insert failed: ${error.message}`);
    }

    return data;
  } catch (err) {
    throw err
  }
}
module.exports = { refineAns, intakeData }
