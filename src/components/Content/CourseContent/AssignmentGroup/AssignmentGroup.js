import React from "react";
import AssignmentHeader from "./AssignmentHeader";
import AssignmentBar from "./AssignmentBar";
import './AssignmentGroup.css';

const AssignmentGroup = ({ sectionLabel, assignmentsObj, activePeriod }) => {
    const icons = {
        assignment: 'fa-solid fa-file-lines',
        assessment: 'fa-solid fa-file-lines',
        application: 'fa-solid fa-file-lines',
        resource: 'fa-regular fa-clipboard'
    };

    const populateAssignments = () => {
        let assignmentBars = [];

        for (let id in assignmentsObj) {
            let assignment = assignmentsObj[id];
            let icon = assignment.type + ' ' + icons[assignment.type];
            // console.log(sectionLabel);

            assignment.label === sectionLabel 
                && assignmentBars.push( generateBar(icon, assignment) );
        }

        return assignmentBars;
    };

    const generateBar = (icon, assignment) => {
        return (<AssignmentBar
            key={assignment.id}
            icon={icon}
            assignment={assignment}
            activePeriod={activePeriod}
        />);
    };

    return (
        <section className="group">
            <AssignmentHeader sectionLabel={sectionLabel} />
            <article className="bars">
                {populateAssignments()}
            </article>
        </section>
    );
}

export default AssignmentGroup;