import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBPoOLzuYrJdO7vgjB_2iqn5Dlq1p5LHlw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "pantrybelt-1e7eb.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "pantrybelt-1e7eb",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "pantrybelt-1e7eb.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "886799477362",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:886799477362:web:bd790a7b927be4153a30eb",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
