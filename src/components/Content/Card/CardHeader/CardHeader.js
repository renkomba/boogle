import React from "react";
import { Prep } from "./Prep/Prep";
import { PrepPeriod } from "./PrepPeriod/PrepPeriod";
import './CardHeader.css';

export const CardHeader = ({ prep, prepPeriods, minimised, setMinimised }) => {
    const generatePeriods = periods => {
        return periods.map( Period => <PrepPeriod 
                key={`${Period.id}`} 
                period={Period.period === 'ct' ? Period.period : Period.period[0]}
                minimised={minimised} 
            />);
    }
    
    return (
        <header 
            className={`card-header${minimised ? ' minimised' : ' maximised'}`}
            onClick={ () => setMinimised(!minimised) }
        >
            <Prep 
                prep={prep} 
                verticalHeader={!minimised} 
            />
            <div className="periods">
                {generatePeriods(prepPeriods)}
            </div>
        </header>
    );
}