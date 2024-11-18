// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import Cookies from 'js-cookie';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6q3GbYxVmQMfNQ0f5vw0k3PatoFKhhKE",
  authDomain: "trender-one.vercel.app",
  projectId: "trender-5332b",
  storageBucket: "trender-5332b.firebasestorage.app",
  messagingSenderId: "448960989934",
  appId: "1:448960989934:web:f8c13fa7fe8a9466a0c1ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // ユーザーがログインしている場合、IDトークンを取得
    const idToken = await user.getIdToken();
    // ログインした場合、auth_tokenをクッキーに保存
    Cookies.set('auth_token', idToken, { expires: 7, path: '/' });
  } else {
    // ログアウトした場合、auth_tokenをクッキーから削除
    Cookies.remove('auth_token', { path: '/' });
  }
});


const db = getFirestore(app);

export { db, auth, googleProvider }
