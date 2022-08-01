import React, { useState } from "react";
import './Card.css';
import { MaximiseIcon } from "./MaximiseIcon/MaximiseIcon";
import { CardHeader } from "./CardHeader/CardHeader"
import { Assignments } from "./Assignments/Assignments"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Card = ({ prep, prepPeriods, totalStudents, ...props }) => {
    const [minimised, setMinimised] = useState(false);
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };
    
    // useEffect(
    //     () => {console.log(minimised ? 'Maximising...' : 'Minimising...');},
    //     [minimised]
    // );

    return (
        <article ref={setNodeRef} className="card"
            draggable='true' style={style}
            {...attributes} {...listeners}>
            <MaximiseIcon style={minimised ? {display: 'flex'} : {display: 'none'}} />

            <CardHeader prep={prep} prepPeriods={prepPeriods} verticalHeader={!minimised}
                minimised={minimised} setMinimised={setMinimised}
                style={minimised ? {display: 'flex', padding: '.5rem', flex: '1 1 10rem'}
                    : {display: '', padding: '3rem', flex: '0 1 10rem'}} />
            
            <Assignments totalStudents={totalStudents} minimised={minimised} />
        </article>
    );
}