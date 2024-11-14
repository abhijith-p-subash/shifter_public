// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSrXi479BVFy9wIU-Ws1d9U_ouPYExd6Q",
  authDomain: "shifter-6d675.firebaseapp.com",
  projectId: "shifter-6d675",
  storageBucket: "shifter-6d675.firebasestorage.app",
  messagingSenderId: "629167720094",
  appId: "1:629167720094:web:712c030dcd70334fd59d8f",
  measurementId: "G-YY5BE50600"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);