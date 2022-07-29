import React from "react";
import './AssignmentType.css';

export const AssignmentType = props => {
    return (
        <p className="assignment-type">{props.type}</p>
    );
}