// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, initializeAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6q3GbYxVmQMfNQ0f5vw0k3PatoFKhhKE",
  authDomain: "trender-5332b.firebaseapp.com",
  projectId: "trender-5332b",
  storageBucket: "trender-5332b.firebasestorage.app",
  messagingSenderId: "448960989934",
  appId: "1:448960989934:web:f8c13fa7fe8a9466a0c1ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();


const db = getFirestore(app);

export { db, auth, googleProvider }
