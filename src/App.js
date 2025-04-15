// src/App.js
import React, { useState } from "react";
import Auth from "./components/auth";
import "./App.css"; 
import "./css/animations.css"
import MainBody from "./components/Mainbody";
import Alert from "./components/alert";
import SettingsMenu from "./components/settings";
import { loadColorsFromFirestore } from "./components/backgroundcolorChanger";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth } from "./firebase/firebaseConfig";
import { useEffect } from "react";
import { color } from "framer-motion";




function App() {
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [view, setView] = useState('chat');
  
  const showAlert = (message) => {
    setAlert({ message});
  };

  useEffect(() => {
    if (user) {
      setAlert({ message: `Welcome ${user.displayName || user.email}!` });
      loadColorsFromFirestore().then(({ color1, color2 }) => {
        console.log({ color1, color2 });
        if (color1 && color2) {
          document.getElementById("mainDiv").style.background = `linear-gradient(${color1}, ${color2})`;
        } else {
          console.log("No colors found for this user. Setting default colors.");
          document.getElementById("mainDiv").style.background = `linear-gradient(#8600f5, #de00fb)`;
        }
      }).catch(error => {
        console.error("Error loading colors:", error);
      });
    }
  }, [user]);

  

  return (
    
    <div id="mainDiv">


      <header>
        <h1 id="app-title">Viola-Buttercup💖</h1>
        <Auth user={user} setUser={setUser} />
        <button onClick={() => {setView(view === 'chat' ? "settings" : "chat")}} className="MenuButton div-animation button-transparent">
          {view === "chat" ? <i class="fa-solid fa-gear fa-lg" style={{color: "white"}}></i> : <i class="fa-solid fa-arrow-left fa-lg" style={{color: "white"}}></i>}
          </button>
      </header>
      {view === "chat" && < MainBody user={user} />}
      {view === "settings" && <SettingsMenu  setAlert={setAlert}/>}
      {alert && <Alert message={alert.message} onClose={() => setAlert(null)} />}
    </div>
  );
}

export default App;