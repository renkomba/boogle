import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import PageContext from "../../../../../contexts/PageContext";
import UserContext from "../../../../../contexts/userContext";
import styles from './PrepPeriod.module.css';

const PrepPeriod = ({ period, minimised }) => {
    const { changePeriod } = useContext(UserContext);
    const { changePage } = useContext(PageContext);
    const navigate = useNavigate();

    const periodId = period.period === 'ct' ? 'people-group'
        : period.period === undefined ? '' : period.period[0];

    const toCourseSite = e => {
        changePage('Dashboard');
        changePeriod(e);
        navigate('../../../../../CourseSite');
    }

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