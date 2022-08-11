import React from "react";
import AssignmentGroup from "./AssignmentGroup/AssignmentGroup";
import Tabs from "./Tabs/Tabs";
import './CourseContent.css';

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

    const pullLabels = () => {
        let arr = ['Class Docs'];

        for (let id in activePeriod.assignments) {
            let assignment = activePeriod.assignments[id];
            !arr.includes(assignment.label) && arr.push(assignment.label);
        }
        return arr;
    }

    return (
        <article className="course-content" >
            <Tabs labels={pullLabels()} />
            <article>
                <section className="buttons">
                    <button>
                        <i className="fa-solid fa-file-circle-plus">
                            <span>ADD RESOURCE</span>
                        </i>
                    </button>
                    <button>
                        <i className="fa-solid fa-plus">
                            <span className='work'>ADD WORK</span>
                        </i>
                    </button>
                    <button>
                        <i className="fa-solid fa-bullhorn">
                            <span>ADD ANNOUNCEMENT</span>
                        </i>
                    </button>
                </section>
                {generateGroups(pullLabels())}
            </article>
        </article>
    );
}

export default CourseContent;