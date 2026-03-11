
import styles from "../styles/FinancialAssessment.module.css";

export const QuestionCard = ({ questionData, currentAnswer, onAnswerChange }) => {
  
  const handleValueChange = (e) => {
    if (!onAnswerChange) return;
    onAnswerChange(questionData.id, e.target.value);
  };

  return (
    <div className={styles['fa-card']}>
      <label className={styles['fa-label']}>{questionData.label}</label>
      <span className={styles['fa-desc']}>{questionData.description}</span>
      
      {questionData.type === "radio" ? (
        <div className={styles['fa-options-grid']}>
          {questionData.options.map((option) => (
            <label key={option} className={styles['fa-radio-label']}>
              <input
                type="radio"
                name={questionData.id}
                value={option}
                checked={currentAnswer === option}
                onChange={handleValueChange}
                className={styles['fa-radio-input']}
              />
              {option}
            </label>
          ))}
        </div>
      ) : (
        <input
          type="number"
          placeholder={questionData.placeholder}
          value={currentAnswer}
          onChange={handleValueChange}
          className={styles['fa-text-input']}
        />
      )}
    </div>
  );
};

