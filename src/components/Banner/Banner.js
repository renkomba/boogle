import React from "react";
import { CalendarIcon } from "./CalendarIcon/CalendarIcon";
import { UserInfo } from "./UserInfo/UserInfo";
import { SettingsIcon } from "./SettingsIcon/SettingsIcon";
import "./Banner.css";

const Banner = ({ user, setUser, toggle, setToggle }) => {
    return (
        <header id="banner">
            <CalendarIcon />
            <UserInfo 
                user={user} 
                setUser={setUser} 
            />
            <SettingsIcon 
                toggle={toggle}
                setToggle={setToggle}
            />
        </header>
    );
}

export default Banner;