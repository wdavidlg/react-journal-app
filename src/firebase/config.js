// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0n_prE_xXtLsIq8zubLz2roixUQ9JELo",
  authDomain: "react-app-e0dda.firebaseapp.com",
  projectId: "react-app-e0dda",
  storageBucket: "react-app-e0dda.appspot.com",
  messagingSenderId: "918677389730",
  appId: "1:918677389730:web:921cd7cbdcc034a649b2fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const googleAuthProvider = new GoogleAuthProvider();

export {
    db,
    googleAuthProvider
}