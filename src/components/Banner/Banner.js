import React from "react";
import CalendarIcon from "./CalendarIcon/CalendarIcon";
import UserInfo from "./UserInfo/UserInfo";
import SettingsIcon from "./SettingsIcon/SettingsIcon";
import styles from "./Banner.module.css";

const Banner = ({ toggle, setToggle }) => {
    return (
        <header className={styles.banner}>
            <CalendarIcon />
            <UserInfo />
            <SettingsIcon toggle={toggle} setToggle={setToggle}/>
        </header>
    );
}

export default Banner;