import os
import sys

try:
    import gdown
except ImportError:
    print("gdown not found. Ensure it is in requirements.txt")
    sys.exit(1)

MODELS_DIR = "models"
MODEL_FILE = "credit_model_v1.pkl"
MODEL_PATH = os.path.join(MODELS_DIR, MODEL_FILE)

# The Google Drive File ID extracted from the provided share link
# https://drive.google.com/file/d/1_w-i0i2fAN7zONlJ9CaRY30Wytx6j9E6/view?usp=sharing
GDRIVE_FILE_ID = "1_w-i0i2fAN7zONlJ9CaRY30Wytx6j9E6"

if not os.path.exists(MODELS_DIR):
    os.makedirs(MODELS_DIR)

if os.path.exists(MODEL_PATH):
    print(f"Model {MODEL_FILE} already exists. Skipping download.")
else:
    print(f"Downloading {MODEL_FILE} from Google Drive...")
    try:
        # Download directly via file ID
        gdown.download(id=GDRIVE_FILE_ID, output=MODEL_PATH, quiet=False)
        print("Download complete!")
    except Exception as e:
        print(f"Download failed: {str(e)}")
        sys.exit(1)
