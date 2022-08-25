import React from "react";
import styles from './Prep.module.css';

const Prep = ({ prep, verticalHeader, toCourseSite }) => {
    return (
        <h2 className={`
            ${prep}
            ${styles.prep} 
            course
            ${verticalHeader ? styles.vertical 
                : styles.horizontal}`}
            onClick={toCourseSite}
        >
            {prep}
        </h2>
    );
}

export default Prep;