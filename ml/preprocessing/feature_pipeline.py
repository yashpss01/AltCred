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

def encode_categorical(df):
    """Encode categorical features using LabelEncoder."""
    print("Encoding categorical features...")
    cat_cols = ['occupation', 'type_of_loan', 'credit_mix', 'payment_of_min_amount', 'payment_behaviour']
    le = LabelEncoder()
    for col in cat_cols:
        if col in df.columns:
            df[col] = df[col].astype(str) # Ensure string
            df[col] = le.fit_transform(df[col])
    return df

def scale_features(df):
    """Scale numeric features using StandardScaler."""
    print("Scaling features...")
    # Exclude target from scaling
    target = 'credit_score'
    features = [col for col in df.columns if col != target]
    
    scaler = StandardScaler()
    df[features] = scaler.fit_transform(df[features])
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
