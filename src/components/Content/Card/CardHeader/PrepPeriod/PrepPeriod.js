import React from "react";
import './PrepPeriod.css';

export const PrepPeriod = ({ period, minimised }) => {
    period = period === 'ct' ? 'people-group' : period;

    return (
        <i className={`prep-period ${minimised ? 'small ' : ''}fa-solid fa-${period}`}></i>
    );
}