import pandas as pd
import joblib
import os

class FeatureService:
    def __init__(self, model_path='ml/models/'):
        self.model_path = model_path
        self.scaler = None
        self.encoders = {}
        self.features_order = [
            'age', 'annual_income', 'monthly_inhand_salary', 'num_bank_accounts',
            'num_credit_card', 'interest_rate', 'num_of_delayed_payment',
            'outstanding_debt', 'credit_utilization_ratio', 'total_emi_per_month',
            'monthly_balance', 'occupation', 'credit_mix', 'payment_of_min_amount',
            'payment_behaviour'
        ]
        self._load_assets()

    def _load_assets(self):
        """Load fitted scalers and encoders from disk."""
        # Load Scaler
        scaler_path = os.path.join(self.model_path, 'scaler.pkl')
        if os.path.exists(scaler_path):
            self.scaler = joblib.load(scaler_path)
        
        # Load Encoders
        cat_cols = ['occupation', 'credit_mix', 'payment_of_min_amount', 'payment_behaviour']
        for col in cat_cols:
            le_path = os.path.join(self.model_path, f'le_{col}.pkl')
            if os.path.exists(le_path):
                self.encoders[col] = joblib.load(le_path)

    def transform(self, data_dict):
        """Transform raw input dictionary into a processed DataFrame ready for model usage."""
        df = pd.DataFrame([data_dict])
        
        # 1. Normalize column names (lowercase, underscores)
        df.columns = [col.lower().replace(' ', '_') for col in df.columns]
        
        # 2. Categorical Encoding
        for col, le in self.encoders.items():
            if col in df.columns:
                df[col] = df[col].astype(str)
                try:
                    df[col] = le.transform(df[col])
                except Exception:
                    # Fallback to first class or default
                    df[col] = 0
        
        # 3. Handle Special Case: type_of_loan (Used for feature order alignment but not encoded in individual pkl)
        # In our pipeline it was labelled but let's ensure it's handled if passed
        
        # 4. Feature Reordering and Scaling
        # We reindex to match the EXACT order the model was trained on
        df = df.reindex(columns=self.features_order).fillna(0)
        
        if self.scaler:
            df[self.features_order] = self.scaler.transform(df[self.features_order])
            
        return df

# Singleton instance
feature_service = FeatureService()
