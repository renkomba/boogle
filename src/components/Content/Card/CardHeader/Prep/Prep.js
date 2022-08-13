import React from "react";
import styles from './Prep.module.css';

export const Prep = ({ prep, verticalHeader }) => {
    return (
        <h2 className={`${styles.prep} ${verticalHeader ? styles.vertical : styles.horizontal}`}>
            {prep}
        </h2>
    );
}