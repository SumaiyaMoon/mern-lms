// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxwQGicGkk-D4-mbSkMuwBpu1cu6cF2WU",
  authDomain: "moon-lms-software.firebaseapp.com",
  projectId: "moon-lms-software",
  storageBucket: "moon-lms-software.appspot.com",
  messagingSenderId: "708633884973",
  appId: "1:708633884973:web:9d31c6245640ab475ffba4",
  measurementId: "G-K1F7M0DEG2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);