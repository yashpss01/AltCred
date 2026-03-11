/**
 * Feature Engineering Service
 * Converts questionnaire answers to normalized numerical features (0-1 scale)
 */

/**
 * Map employment stability to score
 */
function mapEmploymentStability(value) {
    const mapping = {
        '<6 months': 0.2,
        '6–12 months': 0.4,
        '1–3 years': 0.6,
        '3–5 years': 0.8,
        '>5 years': 1.0,
    };
    return mapping[value] || 0.5;
}

/**
 * Normalize monthly income (0-200k range)
 */
function mapMonthlyIncome(value) {
    const income = Number(value) || 0;
    const maxIncome = 200000;
    const normalized = Math.min(income / maxIncome, 1.0);
    return normalized;
}

/**
 * Map income stability to score
 */
function mapIncomeStability(value) {
    const mapping = {
        'Fixed': 1.0,
        'Slightly variable': 0.6,
        'Highly variable': 0.3,
    };
    return mapping[value] || 0.5;
}

/**
 * Map savings buffer to score
 */
function mapSavingsBuffer(value) {
    const mapping = {
        'None': 0.0,
        '<1 month': 0.25,
        '1–3 months': 0.5,
        '3–6 months': 0.75,
        '>6 months': 1.0,
    };
    return mapping[value] || 0.3;
}

/**
 * Map expense ratio to score (inverse - lower is better)
 */
function mapExpenseRatio(value) {
    const mapping = {
        '<40%': 1.0,
        '40–60%': 0.7,
        '60–75%': 0.4,
        '>75%': 0.2,
    };
    return mapping[value] || 0.5;
}

/**
 * Map past loan experience to score
 */
function mapPastLoanExperience(value) {
    const mapping = {
        'Never taken': 0.5,
        'Taken & repaid early/on time': 1.0,
        'Taken & repaid late': 0.3,
        'Taken & defaulted': 0.0,
    };
    return mapping[value] || 0.5;
}

/**
 * Map digital behavior to score
 */
function mapDigitalBehavior(value) {
    const mapping = {
        'Always early': 1.0,
        'On time': 0.8,
        'Sometimes late': 0.4,
        'Usually late': 0.1,
    };
    return mapping[value] || 0.5;
}

/**
 * Map dependents to score (inverse - fewer is better for credit)
 */
function mapDependents(value) {
    const mapping = {
        'None': 1.0,
        '1': 0.8,
        '2–3': 0.6,
        'more': 0.4,
    };
    return mapping[value] || 0.7;
}

/**
 * Map education level to score
 */
function mapEducationLevel(value) {
    const mapping = {
        'No formal education': 0.2,
        'High school': 0.4,
        'UG': 0.6,
        'PG': 0.8,
        'Professional degree': 1.0,
    };
    return mapping[value] || 0.5;
}

/**
 * Map financial discipline to score
 */
function mapFinancialDiscipline(value) {
    const mapping = {
        'Yes, strictly': 1.0,
        'Yes, loosely': 0.6,
        'No': 0.2,
    };
    return mapping[value] || 0.5;
}

/**
 * Main function to engineer features from raw answers
 * @param {Object} answers - Raw questionnaire answers
 * @returns {Object} Engineered features with normalized values
 */
function engineerFeatures(answers) {
    const features = {
        age: Number(answers.age) || 25,
        employmentStability: mapEmploymentStability(answers.employmentStability),
        monthlyIncome: mapMonthlyIncome(answers.monthlyIncome),
        numBankAccounts: Number(answers.numBankAccounts) || 1,
        numCreditCards: Number(answers.numCreditCards) || 0,
        interestRate: Number(answers.interestRate) || 0,
        outstandingDebt: Number(answers.outstandingDebt) || 0,
        monthlyEmis: Number(answers.monthlyEmis) || 0,
        incomeStability: mapIncomeStability(answers.incomeStability),
        savingsBuffer: mapSavingsBuffer(answers.savingsBuffer),
        expenseRatio: mapExpenseRatio(answers.expenseRatio),
        pastLoanExperience: mapPastLoanExperience(answers.pastLoanExperience || answers.loanExperience),
        digitalBehavior: mapDigitalBehavior(answers.digitalBehavior || answers.billDiscipline),
        dependents: mapDependents(answers.dependents),
        educationLevel: mapEducationLevel(answers.educationLevel),
        financialDiscipline: mapFinancialDiscipline(answers.financialDiscipline),
    };

    return features;
}

/**
 * Get feature array (for ML models if needed later)
 */
function getFeatureArray(features) {
    return [
        features.employmentStability,
        features.monthlyIncome,
        features.incomeStability,
        features.savingsBuffer,
        features.expenseRatio,
        features.pastLoanExperience,
        features.digitalBehavior,
        features.dependents,
        features.educationLevel,
        features.financialDiscipline,
    ];
}

module.exports = {
    engineerFeatures,
    getFeatureArray,
};
