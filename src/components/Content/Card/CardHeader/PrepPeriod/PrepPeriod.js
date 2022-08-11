import React from "react";
import { Link } from 'react-router-dom';
import './PrepPeriod.css';

export const PrepPeriod = ({ periodId, activePeriod, minimised, setActivePeriod }) => {
    periodId = periodId === 'ct' ? 'people-group' : periodId;

    return (
        <Link to={'../../../../../pages/CourseSite'} className="Link">
            <i 
                className={`prep-period ${minimised ? 'small ' : ''}fa-solid fa-${periodId}`}
                onClick={ () => setActivePeriod(activePeriod) }
            ></i>
        </Link>
    );
}