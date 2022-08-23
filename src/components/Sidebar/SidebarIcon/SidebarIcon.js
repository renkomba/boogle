import React from "react";
import styles from './SidebarIcon.module.css';

const SidebarIcon = ({ goRight }) => {
    return (
        <i className={`${styles.sidebar_icon} fa-solid fa-caret-${goRight ? 'right' : 'left'}`}></i>
    );
}

export default SidebarIcon;