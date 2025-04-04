import React, { useEffect } from "react";
import { auth, provider } from "../firebase/firebaseConfig";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import LogoutButton from "./logoutBtn";
import { db, query, collection, where, getDocs } from "../firebase/firebaseConfig";

const Auth = ({ user, setUser }) => {
  
  // ✅ Runs when the component mounts to check if the user is already signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && currentUser.email) {
        // ✅ Check Firestore to see if the user's email is allowed
        const q = query(collection(db, "allowedEmails"), where("email", "==", currentUser.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setUser(currentUser); // ✅ Only set user state if email is allowed
        } else {
          alert("Access Denied: Your email is not allowed.");
          await signOut(auth); // Sign out unauthorized users
          setUser(null);
        }
      } else {
        setUser(null); // ✅ Set user to null if not signed in
      }
    });

    return () => unsubscribe(); // ✅ Cleanup listener when component unmounts
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider); // ✅ User state will be handled by onAuthStateChanged
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Error signing in. Please try again.");
    }
  };

  const logout = () => {
    signOut(auth);
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <LogoutButton user={user} setUser={setUser}/>
        </div>
      ) : (
        <button className="login-btn" onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default Auth;
