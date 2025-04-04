// src/App.js
import React, { useState } from "react";
import Auth from "./components/auth";
import "./App.css"; 
import MainBody from "./components/Mainbody";
import Alert from "./components/alert";

function App() {
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  return (
    <div id="mainDiv">
      <header>
        <h1 id="app-title">Viola-Buttercup💖</h1>
        <Auth user={user} setUser={setUser} />
      </header>
      <MainBody user={user} />
      

      {/* Render Alert component when alert state is not null */}
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
    </div>
  );
}

export default App;
