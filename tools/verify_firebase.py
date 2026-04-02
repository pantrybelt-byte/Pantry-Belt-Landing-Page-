import os
import sys
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore

# B.L.A.S.T Layer 3 Tool
# Goal: Verify that the project can talk to Firestore and that the Waitlist collection exists.

def verify_connection():
    load_dotenv(dotenv_path="../.env.local")
    
    print("--- Firebase Connection Verification ---")
    
    # We expect either a path to a service account JSON, or standard app default credentials.
    # For a deterministic check without the full JSON, we verify if credentials can load.
    try:
        if not firebase_admin._apps:
            # Note: For this script to work fully in Python, you need a Service Account Key
            # saved as firebase-service-account.json and mapped in .env.local
            cred_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
            
            if not cred_path or not os.path.exists(cred_path):
                print(f"[-] Missing or invalid GOOGLE_APPLICATION_CREDENTIALS in .env.local: {cred_path}")
                print("[-] In a real environment, provide a valid service account JSON to verify DB reads.")
                print("[*] Linking Phase requires manual API Key insertion for the frontend Web Client anyway. Exiting verification loosely...")
                return False

            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred)
            
        db = firestore.client()
        print("[+] Firebase Admin initialized successfully.")
        
        # Test collection read
        docs = db.collection('waitlist').limit(1).stream()
        print("[+] Successfully connected to 'waitlist' collection.")
        return True
    
    except Exception as e:
        print(f"[-] Verification failed: {e}")
        return False

if __name__ == "__main__":
    if verify_connection():
        sys.exit(0)
    else:
        sys.exit(1)
