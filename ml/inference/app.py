from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import os
import sys
import json
import shap
import time

# Add the project root to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from ml.inference.feature_service import feature_service

app = FastAPI(title="AltCred Production ML Service")

# Registry and Model configuration
REGISTRY_PATH = 'ml/registry/model_registry.json'
MODELS_DIR = 'ml/models/'

# Global variables for model and explainer
current_model = None
current_model_version = None
explainer = None

def load_active_model():
    global current_model, current_model_version, explainer
    try:
        if not os.path.exists(REGISTRY_PATH):
            print(f"Error: Registry not found at {REGISTRY_PATH}")
            return False
            
        with open(REGISTRY_PATH, 'r') as f:
            registry = json.load(f)
            
        active_model_file = registry.get('active_model')
        if not active_model_file:
            print("Error: No active_model defined in registry")
            return False
            
        model_path = os.path.join(MODELS_DIR, active_model_file)
        if os.path.exists(model_path):
            current_model = joblib.load(model_path)
            current_model_version = active_model_file.split('.')[0]
            
            # Initialize SHAP Explainer (Optimized for Trees)
            print(f"Initializing SHAP TreeExplainer for {current_model_version}...")
            explainer = shap.TreeExplainer(current_model)
            
            print(f"Model {current_model_version} loaded successfully from {model_path}")
            return True
        else:
            print(f"Error: Model file not found at {model_path}")
            return False
    except Exception as e:
        print(f"Failed to load model: {str(e)}")
        return False

@app.on_event("startup")
def startup_event():
    load_active_model()

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
    return {
        "status": "healthy" if current_model else "unhealthy", 
        "active_model": current_model_version,
        "explainer_active": explainer is not None
    }

@app.post("/predict-credit-score")
def predict(request: CreditScoreRequest):
    if current_model is None:
        # Try to reload if it failed at startup
        if not load_active_model():
            raise HTTPException(status_code=503, detail="Model not loaded")
    
    start_time = time.time()
    try:
        # 1. Convert request to dict
        input_data = request.dict()
        
        # 2. Transform via Feature Service
        processed_df = feature_service.transform(input_data)
        
        # 3. Run Prediction
        prediction = int(current_model.predict(processed_df)[0])
        probabilities = current_model.predict_proba(processed_df)[0]
        confidence = float(np.max(probabilities))
        
        # 4. Generate SHAP Explanations
        explanation = []
        if explainer:
            # SHAP values for the predicted class
            shap_values = explainer.shap_values(processed_df)
            
            # For Random Forest in sklearn, shap_values is a list of arrays (one per class)
            # We want the values for the predicted class index
            class_index = prediction
            
            # Get values for this sample (first row)
            sample_shap = shap_values[class_index][0]
            
            # Map features to their impact
            feature_impacts = []
            for i, feat_name in enumerate(feature_service.features_order):
                feature_impacts.append({
                    "feature": feat_name,
                    "impact": float(sample_shap[i])
                })
            
            # Sort by absolute impact and take top 3
            explanation = sorted(feature_impacts, key=lambda x: abs(x['impact']), reverse=True)[:3]
        
        # 5. Map result
        categories = {0: "Poor", 1: "Standard", 2: "Good"}
        result_category = categories.get(prediction, "Unknown")
        
        latency_ms = (time.time() - start_time) * 1000
        
        return {
            "credit_score_category": result_category,
            "confidence": round(confidence, 4),
            "probabilities": {categories[i]: round(float(probabilities[i]), 4) for i in range(len(probabilities))},
            "model_version": current_model_version,
            "explanation": explanation,
            "latency_ms": round(latency_ms, 2)
        }
        
    except Exception as e:
        import traceback
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")

@app.post("/reload-model")
def reload():
    if load_active_model():
        return {"status": "success", "active_model": current_model_version}
    else:
        raise HTTPException(status_code=500, detail="Failed to reload model from registry")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
