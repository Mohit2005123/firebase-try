// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// const firebaseConfig = {
//     apiKey: "AIzaSyCmnTciDCRCOQM7TdTK8Tss2euw7SrM6OY",
//     authDomain: "fir-basics-7b78e.firebaseapp.com",
//     projectId: "fir-basics-7b78e",
//     storageBucket: "fir-basics-7b78e.appspot.com",
//     messagingSenderId: "1044713546350",
//     appId: "1:1044713546350:web:2ab8d77e01c6ea2faf3c7f",
//     measurementId: "G-9G5WGN1BVN"
//   };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Initialize Firestore
export default app;
