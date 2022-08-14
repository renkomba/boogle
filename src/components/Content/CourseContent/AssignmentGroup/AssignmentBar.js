import React, { useState } from "react";
import AssignmentModal from "../../../Modal/AssignmentModal";
import styles from './AssignmentBar.module.css';

const AssignmentBar = ({ icon, assignment, activePeriod }) => {
    const [show, setShow] = useState(false);

    let [ submissionsObj, iconJsx ] = [
        activePeriod.submissions[assignment.id],
        <i className={icon}></i>
    ];

    return (
        <div className={styles.bar}>
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