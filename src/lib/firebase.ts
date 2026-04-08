import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "REDACTED_API_KEY",
  authDomain: "pantrybelt-1e7eb.firebaseapp.com",
  projectId: "pantrybelt-1e7eb",
  storageBucket: "pantrybelt-1e7eb.firebasestorage.app",
  messagingSenderId: "886799477362",
  appId: "1:886799477362:web:d154d965067e56b73a30eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
