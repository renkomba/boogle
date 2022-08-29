import React from "react";
import Periods from "../CourseContent/Tags/Periods";
import Tags from "../CourseContent/Tags/Tags";
import styles from './CourseSidebar.module.css';

const CourseSidebar = ({ activePeriod, filterByTag, setTags, tags }) => {
    return (
        <aside className={styles.course_sidebar}>
            <div>
                <Tags activePeriod={activePeriod} 
                    filterByTag={filterByTag}
                    setTags={setTags}
                    tags={tags}
                />
                <br />
                <Periods activePeriod={activePeriod} />
            </div>
        </aside>
    );
}

export default CourseSidebar;