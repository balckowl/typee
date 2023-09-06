// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDGtBvoVoMyCCSaQTVR3IiZazOJahgp28",
    authDomain: "typee-c0a2b.firebaseapp.com",
    projectId: "typee-c0a2b",
    storageBucket: "typee-c0a2b.appspot.com",
    messagingSenderId: "12923759019",
    appId: "1:12923759019:web:55ba699b766d213b0e8aee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };