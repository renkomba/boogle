import React from "react";
import './AssignmentCompletion.css';

export const AssignmentCompletion = ({ submissions, totalStudents }) => {
    return (
        <p className="assignment-completion">
            <span className="submission-count">{submissions}</span>
            /
            <span className="total-students">{totalStudents}</span>
        </p>
    );
}