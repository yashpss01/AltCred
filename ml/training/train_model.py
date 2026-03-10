import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
import os
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score, f1_score

# Paths
PROCESSED_DATA_PATH = 'data/processed/credit_training.csv'
MODEL_SAVE_PATH = 'ml/models/credit_model.pkl'
IMPORTANCE_PLOT_PATH = 'ml/models/feature_importance.png'

def load_processed_data():
    """Load the cleaned and scaled dataset."""
    print(f"Loading processed data from {PROCESSED_DATA_PATH}...")
    df = pd.read_csv(PROCESSED_DATA_PATH)
    X = df.drop(columns=['credit_score'])
    y = df['credit_score']
    return X, y

def evaluate_model(model, X_test, y_test, model_name):
    """Calculate and print evaluation metrics."""
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred, average='weighted')
    
    print(f"\n--- {model_name} Evaluation ---")
    print(f"Accuracy: {accuracy:.4f}")
    print(f"F1 Score (Weighted): {f1:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    return accuracy, f1

def plot_feature_importance(model, feature_names):
    """Generate and save feature importance plot for tree-based models."""
    if hasattr(model, 'feature_importances_'):
        importances = model.feature_importances_
        indices = np.argsort(importances)[::-1]
        
        plt.figure(figsize=(12, 8))
        plt.title("Feature Importance")
        plt.bar(range(len(importances)), importances[indices], align="center")
        plt.xticks(range(len(importances)), [feature_names[i] for i in indices], rotation=45, ha='right')
        plt.tight_layout()
        
        os.makedirs(os.path.dirname(IMPORTANCE_PLOT_PATH), exist_ok=True)
        plt.savefig(IMPORTANCE_PLOT_PATH)
        print(f"Feature importance plot saved to {IMPORTANCE_PLOT_PATH}")

def run_training_pipeline():
    """Main execution function for training and selection."""
    try:
        # 1. Load Data
        X, y = load_processed_data()
        
        # 2. Train/Test Split (Stratified)
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        print(f"Data split complete. Training set: {X_train.shape}, Test set: {X_test.shape}")
        
        # 3. Initialize Models
        models = {
            "Logistic Regression": LogisticRegression(max_iter=1000),
            "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42),
            "XGBoost": XGBClassifier(use_label_encoder=False, eval_metric='mlogloss', random_state=42)
        }
        
        best_model = None
        best_f1 = 0
        results = []
        
        # 4. Train and Evaluate
        for name, model in models.items():
            print(f"Training {name}...")
            model.fit(X_train, y_train)
            acc, f1 = evaluate_model(model, X_test, y_test, name)
            results.append({"Model": name, "Accuracy": acc, "F1 Score": f1})
            
            if f1 > best_f1:
                best_f1 = f1
                best_model = model
                best_model_name = name
                
        # 5. Model Comparison
        comparison_df = pd.DataFrame(results)
        print("\n--- Model Comparison ---")
        print(comparison_df.to_string(index=False))
        print(f"\nBest Model: {best_model_name} with F1 Score: {best_f1:.4f}")
        
        # 6. Feature Importance (for the best model if applicable)
        plot_feature_importance(best_model, X.columns)
        
        # 7. Save Best Model
        os.makedirs(os.path.dirname(MODEL_SAVE_PATH), exist_ok=True)
        joblib.dump(best_model, MODEL_SAVE_PATH)
        print(f"Best model ({best_model_name}) saved to {MODEL_SAVE_PATH}")
        
        return best_model
        
    except Exception as e:
        print(f"Error in training pipeline: {e}")
        raise e

if __name__ == "__main__":
    run_training_pipeline()
