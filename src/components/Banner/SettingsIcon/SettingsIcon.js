import React from "react";
import './SettingsIcon.css';

export const SettingsIcon = ({ toggle, setToggle }) => {
    return (
        <section 
            id="settings"
            onClick={ () => setToggle(!toggle) }
        >
            <i className="fa-solid fa-sliders"></i>
        </section>
    );
}