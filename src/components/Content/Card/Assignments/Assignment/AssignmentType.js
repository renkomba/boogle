import React from "react";
import './AssignmentType.css';

export const AssignmentType = ({ type }) => {
    return (
        <p className="assignment-type">{type}</p>
    );
}