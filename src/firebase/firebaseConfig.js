// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs  } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxtPqCYIKw5uAZ7B5f26qMWaonKWWedJE",
  authDomain: "private-chat-app-3dd72.firebaseapp.com",
  projectId: "private-chat-app-3dd72",
  storageBucket: "private-chat-app-3dd72.appspot.com",  // ✅ Fixed
  messagingSenderId: "729521242905",
  appId: "1:729521242905:web:f11905d9ca27bbab773b88",
  measurementId: "G-GGPSPLY5VL"
};

// 🔹 Initialize Firebase app
const app = initializeApp(firebaseConfig);

// 🔹 Initialize Firebase services
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// 🔹 Export Firebase services
export { 
  app, 
  auth, 
  provider, 
  db, 
  collection, 
  query, 
  where, 
  getDocs 
};
