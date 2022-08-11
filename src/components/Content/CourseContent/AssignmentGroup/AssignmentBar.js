import React from "react";
import './AssignmentBar.css';

const AssignmentBar = ({ icon, assignment, activePeriod }) => {
    let submissionsObj = activePeriod.submissions[assignment.id]
    return (
        <div className="bar">
            <i className={icon}></i>
            <p 
                className="title"
                contentEditable="true"
                onBlur={ ({ currentTarget }) => {
                    assignment.title = currentTarget.textContent;
                }}
            >
                {assignment.title}
            </p>
            { 
                assignment.type !== 'resource'
                && (submissionsObj.isCompleted ?
                <i className="fa-solid fa-check"></i>
                : <p className="submissions">
                    {submissionsObj.turnedIn}
                    &nbsp;/&nbsp;
                    {activePeriod.totalStudents}
                </p>)
            }
        </div>
    );
}

export default AssignmentBar;