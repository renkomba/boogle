import React from "react";
import './AssignmentTitle.css';

export const AssignmentTitle = props => {
    return (
        <p className="assignment-title">{props.title}</p>
    );
}