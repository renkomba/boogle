import React, { useState } from "react";
import AssignmentModal from "../Modal/AssignmentModal";
import styles from './AddBar.module.css';

const AddBar = ({tag, activePeriod, addAssignmentToGroup}) => {
    const [show, setShow] = useState(false);

    const showModal = () => setShow(true);

    const createAssignment = (type='assignment') => {
        let iconJsx = (<i className={`${type} fa-solid fa-file-lines`}></i>);
        let course = activePeriod.course || activePeriod;
        let assignment = course.addAssignment(type, tag);

        return (
            <AssignmentModal setShow={setShow}
                addAssignmentToGroup={addAssignmentToGroup}
                activePeriod={activePeriod}
                assignment={assignment}
                iconJsx={iconJsx}
                show={show}
            />
        );
    }

    return (
        <div onClick={showModal}
            className={styles.bar_spacer}
        >
            <i className="fa-solid fa-plus"></i>
            <div></div>
            {show && createAssignment()}
        </div>
    );
}

export default AddBar;