import React, { useEffect } from "react";
import CourseContent from "./CourseContent/CourseContent";

const CourseSite = ({ id, toggle, activePeriod, changePage }) => {
    useEffect(
        () => {
            changePage('Dashboard')
        },
        [activePeriod]
    );

    return (
        <main className={id}>
            <CourseContent activePeriod={activePeriod} />
        </main>
    );
}

export default CourseSite;