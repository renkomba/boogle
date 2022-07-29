import React from "react";
import { Teacher } from "../../../classes/Teacher";
import './UserInfo.css';

export const UserInfo = ({ user, setUser }) => {
    return (
        <section id="user">
            <i className="fa-solid fa-circle-user"
                onClick={() => setUser(new Teacher())}></i>
            <p>
                <span id="name">{user.displayName}</span>
                <br/><span id="title">{user.jobTitle}</span>
                <br/><span id="school">{user.schoolName}</span>
            </p>
        </section>
    );
}