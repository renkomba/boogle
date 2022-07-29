import React from "react";
import './SidebarIcon.css';

export const SidebarIcon = ({ goRight }) => {
    return (
        <i className={`sidebar-icon fa-solid fa-caret-${goRight ? 'right' : 'left'}`}></i>
    );
}