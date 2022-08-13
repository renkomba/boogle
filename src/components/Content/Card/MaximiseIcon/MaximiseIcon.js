import React from "react";
import styles from './MaximiseIcon.module.css';

export const MaximiseIcon = ({ style }) => {
    return (
        <div className={styles.action_icon}>
            <i className="fa-solid fa-maximize"
                style={style}></i>
        </div>
    );
}