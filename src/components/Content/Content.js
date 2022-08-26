import React from "react";
import Card from "./Card/Card";
import { Sidebar } from "../Sidebar/Sidebar";
import { useDroppable } from '@dnd-kit/core';
import {
    rectSortingStrategy,
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import styles from './Content.module.css';

const Content = ({id, cardIds, user, viewByPrep}) => {    
    const { setNodeRef } = useDroppable({ id });

    const generateCards = (cards=[]) => {
        let collective = viewByPrep ? user.courses.slice(0) 
            : [...user.periods.nonCts, user.periods.cts];

        for (let cardId of cardIds.slice(0)) {
            for (let i = 0; i < collective.length; i++) {
                if (collective[i].id === cardId) {
                    cards.push(<Card 
                        key={cardId}
                        course={collective[i]} 
                        viewByPrep={viewByPrep}
                    />);

                    // remove element that has just been matched
                    collective.splice(i, 1);
                    // decrement var i to compensate for splice
                    i--;
                }
            }
        }
        return cards;
    };

    return (
        <article className={styles.content}>
            <Sidebar />
            <SortableContext id={id}
                items={cardIds}
                strategy={ !viewByPrep ? rectSortingStrategy
                    : verticalListSortingStrategy }
            >
                <div ref={setNodeRef}
                    className={styles.cards}
                >
                    {generateCards()}
                </div>
            </SortableContext>
        </article>
    );
}

export default Content;