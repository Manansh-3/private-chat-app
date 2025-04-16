import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, setDoc, deleteDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion"; // 🎉 Import animations

let typingTimeout = null;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [typingUser, setTypingUser] = useState(null);
  const chatBoxRef = useRef(null); // ✅ Reference to chat box

  const user = auth.currentUser;

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribeMessages = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Listen for typing status
    const typingRef = collection(db, "typingStatus");
    const unsubscribeTyping = onSnapshot(typingRef, (snapshot) => {
      if (!snapshot.empty) {
        const typingData = snapshot.docs[0].data();
        setTypingUser(typingData.user);
      } else {
        setTypingUser(null);
      }
    });

    return () => {
      unsubscribeMessages();
      unsubscribeTyping();
    };
  }, []);

  useEffect(() => {
    // ✅ Scroll to the bottom when messages update
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleTyping = async () => {
    if (!user) return;

    const typingRef = doc(db, "typingStatus", "activeUser");
    await setDoc(typingRef, { user: user.displayName });

    if (typingTimeout) clearTimeout(typingTimeout);

    typingTimeout = setTimeout(async () => {
      await deleteDoc(typingRef);
    }, 1000);
  };

  const sendMessage = async () => {
    if (message.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      text: message,
      user: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      avatar: auth.currentUser.photoURL, // ✅ Store avatar
      timestamp: serverTimestamp(),
    });

    setMessage("");
    await deleteDoc(doc(db, "typingStatus", "activeUser"));
  };

  return (
    <div id="inner-mainDiv">
      <div id="chat-box" ref={chatBoxRef} style={{ overflowY: "auto"}}>
        {messages.map(msg => (
          <div key={msg.id} className="message" style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            {msg.avatar && (
              <img 
                src={msg.avatar} 
                alt="User Avatar" 
                className="avatar" 
                style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }}
              />
            )}
            <div id="message-box">
            <p id="message-header" > 
              <strong style={{ fontSize: "15px" }}>{msg.user}</strong>
              <p>{msg.timestamp?.toDate?.().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              
            </p>
            {msg.text}
            </div>
           
          </div>
        ))}

        {/* ✅ Animated Typing Indicator */}
        <AnimatePresence>
          {typingUser && (
            <motion.p
              className="typing-status"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {typingUser} is typing...
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div id="input-submit-div">
      <input 
        id="Message-button" 
        value={message} 
        onChange={(e) => {
          setMessage(e.target.value);
          handleTyping();
          }} 
         onKeyDown={(e) => {
           if (e.key === "Enter") {
              sendMessage();
                }
  }} 
  placeholder="Type a message..." 
  autoComplete="off" 
/>
        <button onClick={sendMessage} id="send-button">⫸</button>
      </div>
    </div>
  );
};

export default Chat;
