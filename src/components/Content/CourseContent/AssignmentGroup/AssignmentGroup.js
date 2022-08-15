import React from "react";
import AssignmentHeader from "./AssignmentHeader";
import AssignmentBar from "./AssignmentBar";
import styles from './AssignmentGroup.module.css';
import { useDroppable } from "@dnd-kit/core";
import { 
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

const AssignmentGroup = ({
    id, sectionLabel, activePeriod, relevantAssignments
}) => {
    const { setNodeRef } = useDroppable({ id })
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

        for (let id of relevantAssignments) {
            let assignment = activePeriod.course.assignments[id];
            let icon = assignment.type + ' ' + icons[assignment.type];
            assignmentBars.push( generateBar(icon, assignment) );
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
        <section
            key={sectionLabel}
            className={styles.group}
        >
            <AssignmentHeader sectionLabel={sectionLabel} />
            <SortableContext
                id={id}
                items={relevantAssignments}
                strategy={verticalListSortingStrategy}
            >
                <article 
                    className={styles.bars}
                    ref={setNodeRef}
                >
                    {populateAssignments()}
                </article>
            </SortableContext>
        </section>
    );
}

export default AssignmentGroup;