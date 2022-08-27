import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import AssignmentModal from "../Modal/AssignmentModal";
import styles from './AddButtons.module.css';

const AddButtons = (activePeriod, addAssignmentToGroup) => {
    const [show, setShow] = useState(false);

    // This is weird, but React is parsing activePeriod as the object of props
    const createAssignment = () => {
        let iconJsx = (<i className="assignment fa-solid fa-file-lines"></i>);
        let course = activePeriod.activePeriod.course ?
            activePeriod.activePeriod.course : activePeriod.activePeriod;
        let assignment = course.addAssignment('assignment');
        // setShow(true);
        return (
            <AssignmentModal setShow={setShow}
                addAssignmentToGroup={activePeriod.addAssignmentToGroup}
                activePeriod={activePeriod.activePeriod} 
                assignment={assignment}
                iconJsx={iconJsx}
                show={show}
            />
        );
    };

    return (
        <article className={styles.add_button_group}>
            <Button className={styles.work_button}
                onClick={ () => setShow(true) }
            >
                <i className="fa-solid fa-plus"></i>
            </Button>
            <section className={styles.buttons}>
                <Button 
                    size="lg"
                    type="button"
                    className={`${styles.button} ${styles.announcement}`}
                    active
                >
                    <i className="fa-solid fa-file-circle-plus">
                        <span>ADD RESOURCE</span>
                    </i>
                </Button>
                <Button 
                    size="lg"
                    type="button"
                    className={`${styles.button} ${styles.resource}`}
                    active
                >
                    <i className="fa-solid fa-bullhorn">
                        <span>ADD ANNOUNCEMENT</span>
                    </i>
                </Button>
            </section>
            {show && createAssignment()}
        </article>
    );
}

export default AddButtons;