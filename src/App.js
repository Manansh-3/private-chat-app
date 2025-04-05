// src/App.js
import React, { useState } from "react";
import Auth from "./components/auth";
import "./App.css"; 
import MainBody from "./components/Mainbody";
import Alert from "./components/alert";
import SettingsMenu from "./components/settings";


function App() {
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [view, setView] = useState('chat');


  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

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
      {view === "settings" && <SettingsMenu />}
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
    </div>
  );
}

export default App;
