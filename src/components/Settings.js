import react from "react";
import BackgroundColorChanger from "./backgroundcolorChanger";

function SettingsMenu({setAlert}) {
    return (
        <div id="settingsDiv" className="div-back-color div-animation">
            <BackgroundColorChanger setAlert={setAlert}/>
            <p>this is under development
            </p>
        </div>
        )
}

export default SettingsMenu;