import React from "react";
import './AssignmentHeader.css';

const AssignmentHeader = ({ sectionLabel }) => {
    return (
        <header className="section-header">
            <h2>{sectionLabel}</h2>
        </header>
    );
};

export default AssignmentHeader;