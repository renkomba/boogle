import React from "react";
import styles from './CategoryOverlay.module.css';
import Badge from 'react-bootstrap/Badge';

const CategoryOverlay = ({ tag, assignments }) => {
    console.log(assignments);
    return (
        <div className={styles.overlay}>
            <h3>{tag}</h3>
            <Badge 
                pill
                className={styles.badge_background}
            >
                {assignments.length}
            </Badge>
            <span
                className={styles.visually_hidden}
            >
                There are {assignments.length} assignments under {tag}
            </span>
        </div>
    );
}

export default CategoryOverlay;