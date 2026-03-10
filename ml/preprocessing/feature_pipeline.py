import pandas as pd
import numpy as np
import kagglehub
from kagglehub import KaggleDatasetAdapter
from sklearn.preprocessing import StandardScaler, LabelEncoder
import os

# Paths
RAW_DATA_PATH = 'data/raw/credit_score_dataset.csv'
PROCESSED_DATA_PATH = 'data/processed/credit_training.csv'

def load_raw_dataset():
    """Download and load the raw dataset using kagglehub."""
    print("Ingesting dataset from Kaggle...")
    df = kagglehub.load_dataset(
        KaggleDatasetAdapter.PANDAS,
        "parisrohan/credit-score-classification",
        path="train.csv" # The main training file
    )
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(RAW_DATA_PATH), exist_ok=True)
    
    # Save raw for reproducibility
    df.to_csv(RAW_DATA_PATH, index=False)
    print(f"Raw dataset saved to {RAW_DATA_PATH}. Shape: {df.shape}")
    return df

def clean_dataset(df):
    """
    Comprehensive cleaning of the Credit Score Classification dataset.
    """
    print("Starting data cleaning...")
    df = df.copy()
    
    # 1. Normalize column names
    df.columns = [col.lower().replace(' ', '_') for col in df.columns]
    
    # 2. Remove non-useful identifiers
    drop_cols = ['id', 'customer_id', 'month', 'name', 'ssn']
    df.drop(columns=[c for c in drop_cols if c in df.columns], inplace=True)
    
    # 3. Handle numeric columns with underscores/junk
    numeric_candidates = [
        'age', 'annual_income', 'num_of_delayed_payment', 
        'changed_credit_limit', 'outstanding_debt', 'amount_invested_monthly', 
        'monthly_balance'
    ]
    
    for col in numeric_candidates:
        if col in df.columns and df[col].dtype == 'object':
            print(f"Cleaning numeric column: {col}")
            # Replace underscores and convert to numeric
            df[col] = df[col].astype(str).str.replace('_', '')
            df[col] = pd.to_numeric(df[col], errors='coerce')
    
    # 4. Handle missing values
    # For numeric, fill with median
    num_cols = df.select_dtypes(include=[np.number]).columns
    for col in num_cols:
        df[col] = df[col].fillna(df[col].median())
    
    # 5. Standardize categorical labels
    if 'occupation' in df.columns:
        df['occupation'] = df['occupation'].str.replace('_______', 'Other')
    
    if 'credit_mix' in df.columns:
        df['credit_mix'] = df['credit_mix'].str.replace('_', 'Standard')
        
    if 'payment_behaviour' in df.columns:
        df['payment_behaviour'] = df['payment_behaviour'].str.replace('!@9#%8^', 'Unknown')

    # 6. Final cleaning steps
    df.drop_duplicates(inplace=True)
    print(f"Cleaning complete. Remaining rows: {len(df)}")
    return df

def encode_target(df):
    """Map Credit_Score to numeric classes."""
    if 'credit_score' in df.columns:
        print("Encoding target column...")
        mapping = {'Poor': 0, 'Standard': 1, 'Good': 2}
        df['credit_score'] = df['credit_score'].map(mapping)
    return df

import joblib

def encode_categorical(df, save_path='ml/models/'):
    """Encode categorical features and save LabelEncoders."""
    print("Encoding categorical features...")
    cat_cols = ['occupation', 'type_of_loan', 'credit_mix', 'payment_of_min_amount', 'payment_behaviour']
    os.makedirs(save_path, exist_ok=True)
    
    for col in cat_cols:
        if col in df.columns:
            df[col] = df[col].astype(str)
            le = LabelEncoder()
            df[col] = le.fit_transform(df[col])
            # Save the fitted encoder
            joblib.dump(le, os.path.join(save_path, f'le_{col}.pkl'))
            print(f"Saved Encoder for {col}")
    return df

def scale_features(df, save_path='ml/models/'):
    """Scale numeric features and save StandardScaler."""
    print("Scaling features...")
    target = 'credit_score'
    features = [col for col in df.columns if col != target]
    
    scaler = StandardScaler()
    df[features] = scaler.fit_transform(df[features])
    
    os.makedirs(save_path, exist_ok=True)
    joblib.dump(scaler, os.path.join(save_path, 'scaler.pkl'))
    print("Saved StandardScaler.")
    return df

def preprocess_input(data_dict, model_path='ml/models/'):
    """Preprocess a single record for inference."""
    df = pd.DataFrame([data_dict])
    
    # 1. Cleaning (subset of clean_dataset)
    df.columns = [col.lower().replace(' ', '_') for col in df.columns]
    
    # 2. Categorical Encoding (Load saved encoders)
    cat_cols = ['occupation', 'type_of_loan', 'credit_mix', 'payment_of_min_amount', 'payment_behaviour']
    for col in cat_cols:
        if col in df.columns:
            le_path = os.path.join(model_path, f'le_{col}.pkl')
            if os.path.exists(le_path):
                le = joblib.load(le_path)
                # Handle unseen labels by mapping to a default if necessary, 
                # but for now assume input matches training
                df[col] = df[col].astype(str)
                # le.transform might fail on new labels, so we handle it
                try:
                    df[col] = le.transform(df[col])
                except:
                    # Fallback to a default class (e.g., first class)
                    df[col] = 0
    
    # 3. Scaling (Load saved scaler)
    scaler_path = os.path.join(model_path, 'scaler.pkl')
    if os.path.exists(scaler_path):
        scaler = joblib.load(scaler_path)
        # We need to ensure the columns match the scaler's expected order
        # The scaler was fitted on 15 features in a specific order
        features_order = [
            'age', 'annual_income', 'monthly_inhand_salary', 'num_bank_accounts',
            'num_credit_card', 'interest_rate', 'num_of_delayed_payment',
            'outstanding_debt', 'credit_utilization_ratio', 'total_emi_per_month',
            'monthly_balance', 'occupation', 'credit_mix', 'payment_of_min_amount',
            'payment_behaviour'
        ]
        # Reorder and handle missing
        df = df.reindex(columns=features_order).fillna(0)
        df[features_order] = scaler.transform(df[features_order])
    
    return df

def run_preprocessing_pipeline():
    """Execution function for the full pipeline."""
    try:
        # 1. Ingest
        df = load_raw_dataset()
        
        # 2. Clean
        df = clean_dataset(df)
        
        # 3. Select relevant features (Filter the candidates)
        relevant_features = [
            'age', 'annual_income', 'monthly_inhand_salary', 'num_bank_accounts',
            'num_credit_card', 'interest_rate', 'num_of_delayed_payment',
            'outstanding_debt', 'credit_utilization_ratio', 'total_emi_per_month',
            'monthly_balance', 'occupation', 'credit_mix', 'payment_of_min_amount',
            'payment_behaviour', 'credit_score'
        ]
        df = df[[f for f in relevant_features if f in df.columns]]
        
        # 4. Transform
        df = encode_categorical(df)
        df = encode_target(df)
        df = scale_features(df)
        
        # 5. Save
        os.makedirs(os.path.dirname(PROCESSED_DATA_PATH), exist_ok=True)
        df.to_csv(PROCESSED_DATA_PATH, index=False)
        print(f"Pipeline executed successfully. Processed data saved to {PROCESSED_DATA_PATH}")
        return df
    except Exception as e:
        print(f"Error in pipeline: {e}")
        raise e

if __name__ == "__main__":
    run_preprocessing_pipeline()
