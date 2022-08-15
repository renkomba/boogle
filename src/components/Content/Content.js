import React from "react";
import { Card } from "./Card/Card";
import { Sidebar } from "../Sidebar/Sidebar";
import CourseContent from "./CourseContent/CourseContent";
import { useDroppable } from '@dnd-kit/core';
import {
    rectSortingStrategy,
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import styles from './Content.module.css';

export const Content = ({
    id, cardIds, user, viewByPrep, activePage, activePeriod, setActivePeriod
}) => {
    let dashboardCards;
    let courseContent;

    if (activePage === 'Dashboard') {
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
                            setActivePeriod={setActivePeriod}
                        />);
    
                        // remove elements as it has already been matched
                        collective.splice(i, 1);
                        // decrement var i to compensate for splice
                        i--;
                    }
                }
            }
            return cards;
        };

        dashboardCards = (
            <SortableContext 
                id={id}
                items={cardIds}
                strategy={
                    viewByPrep ? verticalListSortingStrategy
                        : rectSortingStrategy
                }
            >
                <article 
                    className={styles.cards}
                    ref={setNodeRef}
                >
                    {generateCards()}
                </article>
            </SortableContext>
        );
    }
   
    // Could just have CourseSite use <CourseContent />
    // Instead of changing the entire rendered output
    // depending on the page. Add to to-do
    if (activePage === 'Course Site') {
        courseContent = (
            <CourseContent
                id={id}
                viewByPrep={viewByPrep}
                activePeriod={activePeriod}
            />
        );
    }
    

    return (
        <article className={styles.content}>
            <Sidebar />
            {dashboardCards ? dashboardCards : courseContent}
        </article>
    );
}