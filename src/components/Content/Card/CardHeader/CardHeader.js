import React from "react";
import { Prep } from "./Prep/Prep";
import { PrepPeriod } from "./PrepPeriod/PrepPeriod";
import styles from './CardHeader.module.css';

export const CardHeader = ({ prep, prepPeriods, minimised, setMinimised, setActivePeriod }) => {
    const generatePeriods = periods => {
        return periods.map( Period => <PrepPeriod 
                key={`${Period.id}`} 
                periodId={Period.period === 'ct' || Period.period === undefined ? Period.period : Period.period[0]}
                period={Period}
                minimised={minimised} 
                setActivePeriod={setActivePeriod}
            />);
    }
    
    return (
        <header 
            className={`${styles.card_header} ${minimised ? styles.minimised : styles.maximised}`}
            onClick={ () => setMinimised(!minimised) }
        >
            <Prep 
                prep={prep} 
                verticalHeader={!minimised} 
            />
            <div className={styles.periods}>
                {generatePeriods(prepPeriods)}
            </div>
        </header>
    );
}