import React from "react";
import { Prep } from "./Prep/Prep";
import { PrepPeriod } from "./PrepPeriod/PrepPeriod";
import './CardHeader.css';

export const CardHeader = ({ prep, prepPeriods, minimised, setMinimised, ...props }) => {
    // minimised = minimised === false ? setMinimised(true) : setMinimised(false);
    const generatePeriods = periods => {
        return periods.map( period => <PrepPeriod 
            key={`${period[0]}`} 
            period={period === 'ct' ? period : period[0]}
            minimised={minimised} 
        />);
    }
    
    return (
        <header 
            className="card-header"
            style={props.style}
            onClick={ () => {
                setMinimised(!minimised);
                console.log(`---minimised WAS ${!minimised} and now IS ${minimised}---`);
            } }
        >
            <Prep 
                prep={prep} 
                verticalHeader={!minimised} 
            />
            {generatePeriods(prepPeriods)}
        </header>
    );
}