import React from "react";
import Chat from "./chat";


const MainBody = ({user}) => {
    return (
        <div id="mainBody" className="div-animation">
      {user ? <Chat user={user} /> : <p>Please log in to chat.</p>}
        </div>
    )
}

export default MainBody