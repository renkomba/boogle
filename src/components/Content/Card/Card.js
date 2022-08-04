import React, { useState } from "react";
import './Card.css';
import { MaximiseIcon } from "./MaximiseIcon/MaximiseIcon";
import { CardHeader } from "./CardHeader/CardHeader"
import { Assignments } from "./Assignments/Assignments"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Card = ({ course, viewByPrep }) => {
    let [minimised, setMinimised] = useState(true);

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
                prepPeriods={viewByPrep ? course.periods : [course]}
                setMinimised={setMinimised}
                minimised={minimised}
            />
            <Assignments 
                assignments={course.assignments}
                totalStudents={course.totalStudents} 
                minimised={minimised} 
            />
        </article>
    );
}