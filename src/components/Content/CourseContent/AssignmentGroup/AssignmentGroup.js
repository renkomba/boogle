import React from "react";
import AssignmentHeader from "./AssignmentHeader";
import AssignmentBar from "./AssignmentBar";
import styles from './AssignmentGroup.module.css';

const AssignmentGroup = ({ sectionLabel, assignmentsObj, activePeriod }) => {
    const icons = {
        assignment: 'fa-solid fa-file-lines',
        assessment: 'fa-solid fa-file-lines',
        application: 'fa-solid fa-file-lines',
        resource: 'fa-regular fa-clipboard',
        site: 'fa-solid fa-globe',
        link: 'fa-solid fa-link'
    };

    const populateAssignments = () => {
        let assignmentBars = [];

        for (let id in assignmentsObj) {
            let assignment = assignmentsObj[id];
            let icon = assignment.type + ' ' + icons[assignment.type];

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
        <section className={styles.group}>
            <AssignmentHeader sectionLabel={sectionLabel} />
            <article className={styles.bars}>
                {populateAssignments()}
            </article>
        </section>
    );
}

export default AssignmentGroup;