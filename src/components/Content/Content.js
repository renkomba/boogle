import React from "react";
import { Card } from "./Card/Card";
import { Sidebar } from "../Sidebar/Sidebar";
import { useDroppable } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import './Content.css';

export const Content = ({ id, cardIds, courses }) => {
    const { setNodeRef } = useDroppable({ id });
   
    const generateCards = (cards=[]) => {
        for (let cardId of cardIds) {
            for (let course of courses) {
                if (course.id === cardId) {
                    cards.push(<Card 
                        key={cardId}
                        course={course} 
                    />);
                }
            }
        }
        return cards;
    };

    return (
        <article id="content">
            <Sidebar />
            <SortableContext 
                id={id}
                items={cardIds}
                strategy={verticalListSortingStrategy}
            >
                <article 
                    className="cards"
                    ref={setNodeRef}
                >
                    {generateCards()}
                </article>
            </SortableContext>
        </article>
    );
}