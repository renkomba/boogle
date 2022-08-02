import React from "react";
import { Card } from "./Card/Card";
import { Sidebar } from "../Sidebar/Sidebar";
import { useDroppable } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import './Content.css';

export const Content = ({ id, courses }) => {
    const { setNodeRef } = useDroppable({ id });
    const cardIds = [];
    // debugger;
   
    const generateCards = (courses, cards=[]) => {
        for (let course of courses) {
            cardIds.push(course.id);

            cards.push(<Card 
                key={course.id}
                course={course} 
            />);
        }
        return cards;
    };

    return (
        <article id="content">
            <Sidebar />
            <SortableContext 
                id={id}
                // ids={cardIds}
                items={cardIds}
                strategy={verticalListSortingStrategy}
            >
                <article 
                    className="cards"
                    ref={setNodeRef}
                >
                    {generateCards(courses)}
                </article>
            </SortableContext>
        </article>
    );
}