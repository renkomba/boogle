import React from "react";
import { Link } from 'react-router-dom';
import styles from './PrepPeriod.module.css';

export const PrepPeriod = ({ periodId, period, minimised, setActivePeriod }) => {
    periodId = periodId === 'ct' ? 'people-group' : periodId;

    return (
        <Link to={'../../../../../pages/CourseSite'} className="Link">
            <i 
                className={`${styles.prep_period} ${minimised && styles.small} fa-solid fa-${periodId}`}
                onClick={ () => setActivePeriod(period) }
            ></i>
        </Link>
    );
}