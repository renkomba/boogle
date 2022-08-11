import React from "react";
import { Link } from 'react-router-dom';
import './PeriodBanner.css';

const PeriodBanner = ({ periods, activePeriod, setActivePeriod, setActivePage }) => {
    // console.log('===periods===');
    // console.log(periods);
    periods = [...periods.cts, ...periods.nonCts];
    let periodIds = periods.map( Period => Period.id);
    
    // console.log('===active period===');
    // console.log(activePeriod);
    let i = periodIds.indexOf(activePeriod.id);

    return (
        <header id="period-banner">
            {(i > 0) && [
                <i 
                    key='left-caret'
                    className="fa-solid fa-caret-left"
                    onClick={ () => setActivePeriod(periods[i--])}
                    ></i>
                ]}

            <Link 
                to={'/'} 
                className="Link"
            >
                <h1 
                    className="course"
                    onClick={ () => setActivePage('Dashboard') }
                >
                    {activePeriod.title}
                </h1>

                <p 
                    className="period"
                    onClick={ () => setActivePage('Dashboard') }
                >
                    {activePeriod.period}
                </p>
            </Link>

            {(i < periods.length - 1) && [
                <i 
                    key='right-caret'
                    className="fa-solid fa-caret-right"
                    onClick={ () => setActivePeriod(periods[i++])}
                ></i>
            ]}
        </header>
    );
};

export default PeriodBanner;