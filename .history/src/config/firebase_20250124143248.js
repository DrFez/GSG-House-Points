import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCr9eNnT4VttZrAl5NRzVVWe_giQrpJoXo",
  authDomain: "gsghousepoints.firebaseapp.com",
  projectId: "gsghousepoints",
  storageBucket: "gsghousepoints.firebasestorage.app",
  messagingSenderId: "216187840600",
  appId: "1:216187840600:web:6337e2ce9d497fe12a822d",
  measurementId: "G-NYRCY239PX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
