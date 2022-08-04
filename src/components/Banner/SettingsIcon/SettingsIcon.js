import React from "react";
import './SettingsIcon.css';

export const SettingsIcon = ({ viewByPrep, setViewByPrep }) => {
    return (
        <section 
            id="settings"
            onClick={ () => setViewByPrep(!viewByPrep) }
        >
            <i className="fa-solid fa-sliders"></i>
        </section>
    );
}