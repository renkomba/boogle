import React, { useState, useEffect } from "react";
import './Card.css';
import { MaximiseIcon } from "./MaximiseIcon/MaximiseIcon";
import { CardHeader } from "./CardHeader/CardHeader"
import { Assignments } from "./Assignments/Assignments"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Card = ({ course }) => {
    let [minimised, setMinimised] = useState(false);
    // useEffect(
    //     () => {
    //         console.log('minimised ===', minimised);
    //         console.log(minimised ? `${course.title} is minimised`
    //             : `${course.title} is maximised`);
    //         // setMinimised(!minimised);
    //     }, 
    //     [minimised]
    // );

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: course.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };
    
    // useEffect(
    //     () => {console.log(minimised ? 'Maximising...' : 'Minimising...');},
    //     [minimised]
    // );

    return (
        <article 
            ref={setNodeRef} 
            id={course.id}
            key={course.id}
            className="card"
            style={style}
            {...attributes} 
            {...listeners}
        >
            <MaximiseIcon 
                style={minimised ? {display: 'flex'} : {display: 'none'}}
            />
            <CardHeader 
                prep={course.title} 
                prepPeriods={course.periods}
                setMinimised={setMinimised}
                minimised={minimised}
                style={minimised ? 
                    {display: 'flex', padding: '.5rem', flex: '1 1 10rem'}
                    : {display: '', padding: '3rem', flex: '0 1 10rem'}}
            />
            <Assignments 
                assignments={course.assignments}
                totalStudents={course.totalStudents} 
                minimised={minimised} 
            />
        </article>
    );
}