import React, { useState } from "react";
import './Card.css';
import { MaximiseIcon } from "./MaximiseIcon/MaximiseIcon";
import { CardHeader } from "./CardHeader/CardHeader"
import { Assignments } from "./Assignments/Assignments"

export const Card = ({ prep, prepPeriods, totalStudents }) => {
    const [minimised, setMinimised] = useState(false);
    // useEffect(
    //     () => {console.log(minimised ? 'Maximising...' : 'Minimising...');},
    //     [minimised]
    // );

    return (
        <article draggable="true" className="card">
            <MaximiseIcon style={minimised ? {display: 'flex'} : {display: 'none'}} />

            <CardHeader prep={prep} prepPeriods={prepPeriods} verticalHeader={!minimised}
                minimised={minimised} setMinimised={setMinimised}
                style={minimised ? {display: 'flex', padding: '.5rem', flex: '1 1 10rem'}
                    : {display: '', padding: '3rem', flex: '0 1 10rem'}} />
            
            <Assignments totalStudents={totalStudents} minimised={minimised} />
        </article>
    );
}