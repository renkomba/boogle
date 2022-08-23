import React from "react";
import styles from './AssignmentOverlay.module.css';
import Spinner from 'react-bootstrap/Spinner';

const DragOverlay = ({ label }) => {
    return (
        <div className={styles.overlay}>
            <Spinner
                className={styles.spinner}
                animation="border"
                role="status"
                size="sm"
            >
                <span className={styles.visually_hidden}>Loading...</span>
            </Spinner>
            {label}
        </div>
    );
}

export default DragOverlay;