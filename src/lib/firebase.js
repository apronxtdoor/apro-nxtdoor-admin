// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDkbkkjile_4TrLck5iqgc2NMiHgFXCARI",
  authDomain: "apronxtdoor-admin.firebaseapp.com",
  projectId: "apronxtdoor-admin",
  storageBucket: "apronxtdoor-admin.firebasestorage.app",
  messagingSenderId: "126714767067",
  appId: "1:126714767067:web:5e33cb8907cf9a4bbb8efe",
  measurementId: "G-7JKMJ38E9T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Initialize Analytics (optional)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;