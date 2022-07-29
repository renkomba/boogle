import React from "react";
import './CardHeader.css';
import { Prep } from "./Prep/Prep";
import { PrepPeriod } from "./PrepPeriod/PrepPeriod";

export const CardHeader = ({ prep, prepPeriods, minimised, setMinimised, ...props }) => {
    const generatePeriods = periods => {
        return periods.map( period => <PrepPeriod key={`${period[0]}`} 
            period={period === 'ct' ? period : period[0]}
            minimised={minimised} />);
    }
    
    return (
        <header className="card-header" style={props.style}
            onClick={() => setMinimised(!minimised)}>
            <Prep prep={prep} verticalHeader={props.verticalHeader} />
            {generatePeriods(prepPeriods)}
        </header>
    );
}