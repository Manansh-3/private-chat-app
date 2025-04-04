import React from "react";
import { signOut,  } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig"; 

const LogoutButton = ({ setUser }) => {
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null); // Reset user state after logout
  };

  return <button className="login-btn" onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
