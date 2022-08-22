import React, { useContext } from "react";
import UserContext from "../../../contexts/userContext";
import styles from './UserInfo.module.css';

const UserInfo = () => {
    const { user, changeUser } = useContext(UserContext);
    
    return (
        <section className={styles.user}>
            <i className="fa-solid fa-circle-user"
                onClick={changeUser}
            ></i>
            <p>
                <span id="name">{user.displayName}</span>
                <br/><span id="title">{user.jobTitle}</span>
                <br/><span id="school">{user.schoolName}</span>
            </p>
        </section>
    );
}

export default UserInfo;