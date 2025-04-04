// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs  } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxtPqCYIKw5uAZ7B5f26qMWaonKWWedJE",
  authDomain: "private-chat-app-3dd72.firebaseapp.com",
  projectId: "private-chat-app-3dd72",
  storageBucket: "private-chat-app-3dd72.firebasestorage.app",
  messagingSenderId: "729521242905",
  appId: "1:729521242905:web:f11905d9ca27bbab773b88",
  measurementId: "G-GGPSPLY5VL"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Export Firebase services
 const auth = getAuth(app);
 const provider = new GoogleAuthProvider();
 const db = getFirestore(app);


export { db, auth, provider, collection, query, where, getDocs };