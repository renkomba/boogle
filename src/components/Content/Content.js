import React, { useState } from "react";
import { Card } from "./Card/Card";
import './Content.css';
import { getRandomNum } from "../../hooks/getRandomNum";
import { Sidebar } from "../Sidebar/Sidebar";
import { 
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

export const Content = ({ courseload }) => {
    // debugger;
    const [courses, periods] = [Object.keys(courseload), Object.values(courseload)];
    const [cardIds, setCardIds] = useState(
        courses.map( course => `${course.toLowerCase().split(' ').join('-')}-prep` )
    );
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const handleDragEnd = e => {
        const { active, over } = e;

        if (active.id !== over.id) {
            setCardIds( id => {
                const [ oldIndex, newIndex ] = [
                    id.indexOf(active.id),
                    id.indexOf(over.id)
                ];

                return arrayMove(cardIds, oldIndex, newIndex)
            });
        }
    };
   
    const generateCards = (courses=[], periods=[], cardIds=[], cards=[]) => {
        for (let i = 0; i < courses.length; i++) {
            cards.push(
                <Card prep={courses[i]}
                    key={`card${i}`}
                    id={cardIds[i]}
                    prepPeriods={periods[i]} 
                    totalStudents={getTotalStudents()} />
            );
        }
        return cards;
    };
    
    const getTotalStudents = () => {
        return getRandomNum(35, 20);
    };

    return (
        <article id="content">
            <Sidebar />
            <DndContext sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}>
                <SortableContext ids={cardIds}
                    strategy={verticalListSortingStrategy}>
                    <article className="cards">
                        {generateCards(courses, periods, cardIds)}
                    </article>
                </SortableContext>
            </DndContext>
        </article>
    );
}