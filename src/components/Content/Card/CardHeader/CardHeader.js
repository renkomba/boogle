import React from "react";
import Prep from "./Prep/Prep";
import PrepPeriod from "./PrepPeriod/PrepPeriod";
import styles from './CardHeader.module.css';

const CardHeader = ({ prep, prepPeriods, minimised, setMinimised }) => {
    const generatePeriods = periods => {
        return periods.map( Period => <PrepPeriod 
                key={`${Period.id}`} 
                period={Period}
                minimised={minimised}
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

export default CardHeader;