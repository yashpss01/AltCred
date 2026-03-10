import joblib
import pandas as pd

MODEL_PATH = 'ml/models/credit_model.pkl'

def load_model():
    """Load the trained model binary."""
    try:
        model = joblib.load(MODEL_PATH)
        return model
    except FileNotFoundError:
        print("Model file not found. Ensure training is complete.")
        return None

def run_prediction(features_dict):
    """
    Run inference on a single record.
    Input: Dictionary of features
    Output: Prediction and confidence/probability
    """
    model = load_model()
    if not model:
        return {"error": "Model not loaded"}
    
    # Convert dict to DataFrame for model
    df_input = pd.DataFrame([features_dict])
    
    # Run prediction
    prediction = model.predict(df_input)[0]
    probability = model.predict_proba(df_input)[0].max()
    
    return {
        "prediction": int(prediction),
        "confidence": float(probability)
    }

if __name__ == "__main__":
    # Test prediction format
    test_features = {"age": 28, "income": 55000}
    print(run_prediction(test_features))
