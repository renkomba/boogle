import React, { useState } from "react";
import AssignmentModal from "../../../Modal/AssignmentModal";
import styles from './AssignmentBar.module.css';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const AssignmentBar = ({ icon, assignment, activePeriod }) => {
    const [show, setShow] = useState(false);

    let [ submissionsObj, iconJsx ] = [
        activePeriod.submissions[assignment.id],
        <i className={icon}></i>
    ];

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: assignment.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div 
            className={styles.bar}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            {iconJsx}
            <p 
                className={styles.title}
                onClick={ () => setShow(true) }
            >
                {assignment.title}
            </p>
            <AssignmentModal
                show={show}
                setShow={setShow}
                iconJsx={iconJsx}
                assignment={assignment}
                activePeriod={activePeriod}
            />
            { 
                !['resource', 'site'].includes(assignment.type)
                && (submissionsObj.isCompleted ?
                    <i className="fa-solid fa-check"></i>
                    : <p className={styles.submissions}>
                        {submissionsObj.turnedIn}
                        &nbsp;/&nbsp;
                        {activePeriod.totalStudents}
                    </p>)
            }
        </div>
    );
}

export default AssignmentBar;