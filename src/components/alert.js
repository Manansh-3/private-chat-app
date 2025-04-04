// src/components/Alert.js
import React, { useState, useEffect } from "react";
import "../css/Alert.css"

const Alert = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); // Start animation
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500); // Delay removal for animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`alert alert-${type} ${visible ? "show" : "hide"}`}>
      {message}
      <button className="close-btn" onClick={onClose}>×</button>
    </div>
  );
};

export default Alert;
