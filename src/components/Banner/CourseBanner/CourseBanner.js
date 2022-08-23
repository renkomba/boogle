import React from "react";
import { Link } from 'react-router-dom';
import styles from './CourseBanner.module.css';

const CourseBanner = ({ course, changeCourse, changePage }) => {
    let courses = course.user.courses;
    let courseIds = courses.map( Course => Course.id);
    let i = courseIds.indexOf(course.id);

    return (
        <header className={styles.course_banner}>
            {(i > 0) && [
                <i key='left-caret'
                    className="fa-solid fa-caret-left"
                    onClick={changeCourse}
                ></i>
            ]}

            <Link to={'/'} className={styles.Link}>
                <h1 className={styles.course} onClick={changePage}>
                    {course.title}
                </h1>
            </Link>

            {(i < courses.length - 1) && [
                <i key='right-caret'
                    className="fa-solid fa-caret-right"
                    onClick={changeCourse}
                ></i>
            ]}
        </header>
    );
};

export default CourseBanner;