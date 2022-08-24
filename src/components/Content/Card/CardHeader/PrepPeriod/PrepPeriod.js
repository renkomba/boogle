import React from "react";
import styles from './PrepPeriod.module.css';

const PrepPeriod = ({ period, minimised, toCourseSite }) => {
    const periodId = period.period === 'ct' ? 'people-group'
        : period.period === undefined ? '' : period.period[0];

    return (
        <i className={`
            ${period.title} 
            ${styles.prep_period} 
            ${minimised && styles.small} 
            fa-solid 
            fa-${periodId}`}
            onClick={toCourseSite}
        ></i>
    );
}

export default PrepPeriod;