import React from "react";
import { CalendarIcon } from "./CalendarIcon/CalendarIcon";
import { UserInfo } from "./UserInfo/UserInfo";
import { SettingsIcon } from "./SettingsIcon/SettingsIcon";
import "./Banner.css";

export const Banner = ({ user, setUser }) => {
    return (
        <header id="banner">
            <CalendarIcon />
            <UserInfo user={user} setUser={setUser} />
            <SettingsIcon />
        </header>
    );
}