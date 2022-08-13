import React, { useState } from "react";
import styles from './Card.module.css';
import { MaximiseIcon } from "./MaximiseIcon/MaximiseIcon";
import { CardHeader } from "./CardHeader/CardHeader"
import { Assignments } from "./Assignments/Assignments"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Card = ({ course, viewByPrep, setActivePeriod }) => {
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
            className={styles.card}
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
                setActivePeriod={setActivePeriod}
            />
            <Assignments 
                assignments={course.assignments}
                totalStudents={course.totalStudents} 
                minimised={minimised} 
            />
        </article>
    );
}