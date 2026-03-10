const allowedEmployment = ["<6 months", "6–12 months", "1–3 years", "3–5 years", ">5 years"]
const allowedIncomeStability = ["Fixed", "Slightly variable", "Highly variable"]
const allowedSavings = ["None", "<1 month", "1–3 months", "3–6 months", ">6 months"]
const allowedExpense = ["<40%", "40–60%", "60–75%", ">75%"]
const allowedLoan = ["Never taken", "Taken & repaid early/on time", "Taken & repaid late", "Taken & defaulted"]
const allowedBillPay = ["Always early", "On time", "Sometimes late", "Usually late"]
const allowedEducation = ["No formal education", "High school", "UG", "PG", "Professional degree"]
const allowedBudgetTrack = ["Yes, strictly", "Yes, loosely", "No"]

const allowedDependents = ["None", "1", "2–3", "more"]
const allowedOccupations = ["Scientist", "Teacher", "Engineer", "Doctor", "Architect", "Developer", "Media_Manager", "Manager", "Accountant", "Musician", "Mechanic", "Writer", "Lawyer", "Journalist", "Other"]
const allowedCreditMix = ["Good", "Standard", "Bad"]

function intakeValidator(req, res, next) {
  const { answers } = req.body;
  if (!answers || typeof (answers) !== "object") {
    return res.status(400).json({ message: "answers object is required" })
  }

  console.log('DEBUG: Received answers:', JSON.stringify(answers, null, 2));


  // Handle aliases from frontend
  const loanExperience = answers.loanExperience || answers.pastLoanExperience;
  const billDiscipline = answers.billDiscipline || answers.digitalBehavior;

  const {
    employmentStability,
    monthlyIncome,
    incomeStability,
    savingsBuffer,
    expenseRatio,
    dependents,
    educationLevel,
    financialDiscipline,
  } = answers;

  if (!employmentStability || !allowedEmployment.includes(employmentStability)) {
    return res.status(400).json({ message: "Invalid employment stability option" });
  }

  const incomeNum = Number(monthlyIncome);
  if (!monthlyIncome || isNaN(incomeNum) || !isFinite(incomeNum) || incomeNum <= 0) {
    return res.status(400).json({ message: "Monthly income must be a positive valid number" })
  }

  if (!incomeStability || !allowedIncomeStability.includes(incomeStability)) {
    return res.status(400).json({ message: "Invalid income stability option" });
  }

  if (!savingsBuffer || !allowedSavings.includes(savingsBuffer)) {
    return res.status(400).json({ message: "Invalid savings buffer option" })
  }

  if (!expenseRatio || !allowedExpense.includes(expenseRatio)) {
    return res.status(400).json({ message: "Invalid expense ratio option" })
  }

  if (!loanExperience || !allowedLoan.includes(loanExperience)) {
    return res.status(400).json({ message: "Invalid loan experience option" })
  }

  if (!billDiscipline || !allowedBillPay.includes(billDiscipline)) {
    return res.status(400).json({ message: "Invalid bill discipline option" });
  }

  if (!dependents || !allowedDependents.includes(dependents)) {
    return res.status(400).json({ message: "Invalid dependents option" })
  }

  if (!educationLevel || !allowedEducation.includes(educationLevel)) {
    return res.status(400).json({ message: "Invalid education option" })
  }

  if (!financialDiscipline || !allowedBudgetTrack.includes(financialDiscipline)) {
    return res.status(400).json({ message: "Invalid financial discipline option" })
  }

  // --- ML Specific Fields ---
  const {
    age,
    num_bank_accounts,
    num_credit_card,
    interest_rate,
    num_of_delayed_payment,
    outstanding_debt,
    credit_utilization_ratio,
    total_emi_per_month,
    monthly_balance,
    occupation,
    credit_mix
  } = answers;

  // Validation for numeric ML fields (allowing optional/defaults if not provided)
  const mlNumericFields = {
    age: Number(age) || 25,
    num_bank_accounts: Number(num_bank_accounts) || 1,
    num_credit_card: Number(num_credit_card) || 1,
    interest_rate: Number(interest_rate) || 10,
    num_of_delayed_payment: Number(num_of_delayed_payment) || 0,
    outstanding_debt: Number(outstanding_debt) || 0,
    credit_utilization_ratio: Number(credit_utilization_ratio) || 30,
    total_emi_per_month: Number(total_emi_per_month) || 0,
    monthly_balance: Number(monthly_balance) || 500
  };

  if (occupation && !allowedOccupations.includes(occupation)) {
     return res.status(400).json({ message: "Invalid occupation option" });
  }

  if (credit_mix && !allowedCreditMix.includes(credit_mix)) {
     return res.status(400).json({ message: "Invalid credit mix option" });
  }

  // Normalize answers for controller/service
  req.body.answers = {
    ...answers,
    ...mlNumericFields,
    occupation: occupation || "Other",
    credit_mix: credit_mix || "Standard",
    loanExperience,
    billDiscipline
  };

  next()
}

module.exports = intakeValidator;
