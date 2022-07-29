import React from "react";
import './AssignmentCompletion.css';

export const AssignmentCompletion = props => {
    return (
        <p className="assignment-completion">
            <span className="submission-count">{props.submissions}</span>
            /
            <span className="total-students">{props.totalStudents}</span>
        </p>
    );
}