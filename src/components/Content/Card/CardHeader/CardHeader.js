import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import PageContext from "../../../../contexts/PageContext";
import UserContext from "../../../../contexts/userContext";
import PrepPeriod from "./PrepPeriod/PrepPeriod";
import Prep from "./Prep/Prep";
import styles from './CardHeader.module.css';

const CardHeader = ({ prep, prepPeriods, minimised, setMinimised }) => {
    const generatePeriods = periods => {
        return periods.map( Period => <PrepPeriod 
            toCourseSite={toCourseSite}
            minimised={minimised}
            key={`${Period.id}`} 
            period={Period}
        />);
    }

    const { changePeriod } = useContext(UserContext);
    const { changePage } = useContext(PageContext);
    const navigate = useNavigate();

    const toCourseSite = e => {
        changePage('Dashboard');
        changePeriod(e);
        navigate('../../../../../CourseSite');
    }
    
    return (
        <header 
            className={`${styles.card_header} ${minimised ? styles.minimised : styles.maximised}`}
            onClick={ () => setMinimised(!minimised) }
        >
            <Prep prep={prep}
                toCourseSite={toCourseSite}
                verticalHeader={!minimised} 
            />
            <div className={styles.periods}>
                {generatePeriods(prepPeriods)}
            </div>
        </header>
    );
}

export default CardHeader;