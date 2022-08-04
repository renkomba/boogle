import React from "react";
import { Card } from "./Card/Card";
import { Sidebar } from "../Sidebar/Sidebar";
import { useDroppable } from "@dnd-kit/core";
import {
    rectSortingStrategy,
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import './Content.css';

export const Content = ({ id, cardIds, user, viewByPrep }) => {
    const { setNodeRef } = useDroppable({ id });
   
    const generateCards = (cards=[]) => {
        let [ ids, collective ] = [
            cardIds.slice(0),
            viewByPrep ? user.courses.slice(0) 
                : [...user.periods.nonCts, user.periods.cts]
        ];

        for (let cardId of ids) {
            for (let i = 0; i < collective.length; i++) {
                if (collective[i].id === cardId) {
                    cards.push(<Card 
                        key={cardId}
                        course={collective[i]} 
                        viewByPrep={viewByPrep}
                    />);
                    collective.splice(i, 1);  //remove element as it is no longer an option
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
                strategy={
                    viewByPrep ? verticalListSortingStrategy
                        : rectSortingStrategy
                }
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