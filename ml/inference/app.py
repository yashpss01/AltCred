from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import os
import sys

# Add the project root to path so we can import preprocessing
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from ml.preprocessing.feature_pipeline import preprocess_input

app = FastAPI(title="AltCred ML Inference Service")

# Model Path
MODEL_PATH = 'ml/models/credit_model.pkl'
model = None

@app.on_event("startup")
def load_model():
    global model
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
        print(f"Model loaded from {MODEL_PATH}")
    else:
        print(f"Error: Model not found at {MODEL_PATH}")

class CreditScoreRequest(BaseModel):
    age: float
    annual_income: float
    monthly_inhand_salary: float
    num_bank_accounts: int
    num_credit_card: int
    interest_rate: float
    num_of_delayed_payment: int
    outstanding_debt: float
    credit_utilization_ratio: float
    total_emi_per_month: float
    monthly_balance: float
    occupation: str = "Other"
    type_of_loan: str = "None"
    credit_mix: str = "Standard"
    payment_of_min_amount: str = "No"
    payment_behaviour: str = "Low_spent_Small_value_payments"

@app.get("/health")
def health_check():
    return {"status": "ML service running", "model_version": "1.0.0"}

@app.post("/predict-credit-score")
def predict(request: CreditScoreRequest):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        # 1. Convert request to dict
        input_data = request.dict()
        
        # 2. Preprocess
        processed_df = preprocess_input(input_data)
        
        # 3. Predict
        prediction = model.predict(processed_df)[0]
        probabilities = model.predict_proba(processed_df)[0]
        confidence = float(np.max(probabilities))
        
        # 4. Map result
        # Poor -> 0, Standard -> 1, Good -> 2
        categories = {0: "Poor", 1: "Standard", 2: "Good"}
        result_category = categories.get(prediction, "Unknown")
        
        return {
            "credit_score_category": result_category,
            "confidence": round(confidence, 4),
            "probabilities": {categories[i]: round(float(probabilities[i]), 4) for i in range(len(probabilities))}
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
