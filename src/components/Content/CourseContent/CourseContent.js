import React from "react";
import Button from "react-bootstrap/Button"
import AssignmentGroup from "./AssignmentGroup/AssignmentGroup";
import Tabs from "./Tabs/Tabs";
import styles from './CourseContent.module.css';

const CourseContent = ({ user, viewByWeek, activePeriod }) => {
    const generateGroups = (labels=['SECTION']) => {
        let arr = [];

        for (let label of labels) {
            arr.push(
                <AssignmentGroup 
                    key={`${label}-assignments`}
                    sectionLabel={label}
                    assignmentsObj={activePeriod.assignments}
                    activePeriod={activePeriod}
                />
            );
        }
        return arr;
    };

    return (
        <article className={styles.course_content}>
            <Tabs activePeriod={activePeriod} />
            <article className={styles.buttonsAndAssignments}>
                <section className={styles.buttons}>
                    <Button 
                        size="lg"
                        type="button"
                        className={`${styles.button} ${styles.secondaryBtn}`}
                        active
                    >
                        <i className="fa-solid fa-file-circle-plus">
                            <span>ADD RESOURCE</span>
                        </i>
                    </Button>
                    <Button 
                        size="lg"
                        type="button"
                        className={`${styles.button} ${styles.primaryBtn}`}
                        active
                    >
                        <i className="fa-solid fa-plus">
                            <span className={styles.work}>ADD WORK</span>
                        </i>
                    </Button>
                    <Button 
                        size="lg"
                        type="button"
                        className={`${styles.button} ${styles.secondaryBtn}`}
                        active
                    >
                        <i className="fa-solid fa-bullhorn">
                            <span>ADD ANNOUNCEMENT</span>
                        </i>
                    </Button>
                </section>
                <section className="assignments-and-labels">
                    {generateGroups(activePeriod.course.assignmentLabels)}
                </section>
            </article>
        </article>
    );
}

export default CourseContent;