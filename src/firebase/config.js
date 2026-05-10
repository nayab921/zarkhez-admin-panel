// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwv-6wyJ4nBmQ8gqyRRv84x3Mu23csXAY",
  authDomain: "zarkhez-6a6a7.firebaseapp.com",
  databaseURL: "https://zarkhez-6a6a7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "zarkhez-6a6a7",
  storageBucket: "zarkhez-6a6a7.firebasestorage.app",
  messagingSenderId: "461858404718",
  appId: "1:461858404718:web:7ef372f10574f588d9697f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);