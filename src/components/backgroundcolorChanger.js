import React, { useState } from 'react';
import { useEffect } from 'react';
import { setDoc, getDoc, doc } from 'firebase/firestore';
import { auth } from '../firebase/firebaseConfig';
import Alert from './alert';
import { getFirestore } from 'firebase/firestore';



const loadColorsFromFirestore = async () => {
  const userId = auth.currentUser.uid;
  const db = getFirestore();



  try {
    const userDocRef = doc(db, "currentUsers", userId); // Points to /users/{userId}
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data(); // Returns { color1: "#...", color2: "#..." }
    } else {
      return null;
    }
  } catch (error) {
    console.error("❌ Error loading colors from Firestore:", error);
    return null;
  }
};

const BackgroundColorChanger = ({setAlert}) => {
    const [color1, setColor1] = useState('#8600f5');
    const [color2, setColor2] = useState('#de00fb');
    
    const handleChange = (event) => {
        setColor1(event.target.value);
        document.getElementById("mainDiv").style.background = `linear-gradient(${color1}, ${color2})`;
    };

    const handleChange2 = (event) => {
        setColor2(event.target.value);
        document.getElementById("mainDiv").style.background = `linear-gradient(${color1}, ${color2})`;
    }

    

const saveColorsToFirebase = async (color1, color2) => {
    const userId = auth.currentUser.uid; // Replace with actual user ID logic
    const db = getFirestore();
    await setDoc(doc(db, "currentUsers", userId), {
        color1,
        color2
    });
    console.log("Colors saved to Firebase:", { color1, color2 });
    setAlert({ message: "Colors saved successfully!" });
};

 

    return (

        <div className='colorChangerDiv div-animation-up'>
            <h1 className='div-animation-up'>Background Color Changer</h1>
            <div id='colorInputs' className='div-animation-up'>
            <p>color 1:</p>
            <input
                type="color"
                value={color1}
                onChange={handleChange}
                className='colorInput'
            />
            <p>color 2:</p>
            <input
                type="color"
                value={color2}
                onChange={handleChange2}
                className='colorInput'
            />
            </div>
           
            <button onClick={() => saveColorsToFirebase(color1, color2)} className='normal-button div-animatio       ass  <button onClicormal-buttnimaon-up'>Save Colors</button>
            
        </div>
    );
};

export {loadColorsFromFirestore};
export default BackgroundColorChanger;