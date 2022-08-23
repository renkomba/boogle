import React from "react";
import styles from './AssignmentHeader.module.css';

const AssignmentHeader = ({ sectionLabel }) => {
    return (
        <header className={styles.section_header}>
            <h2>{sectionLabel}</h2>
        </header>
    );
};

export default AssignmentHeader;