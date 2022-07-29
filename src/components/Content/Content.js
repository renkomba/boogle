import React from "react";
import { Card } from "./Card/Card";
import './Content.css';
import { getRandomNum } from "../../hooks/getRandomNum";
import { Sidebar } from "../Sidebar/Sidebar";

export const Content = ({ courseload }) => {
    const [courses, periods] = [Object.keys(courseload), Object.values(courseload)];

    const generateCards = (courses=[], periods=[], cards=[]) => {
        for (let i = 0; i < courses.length; i++) {
            cards.push(<Card prep={courses[i]} 
                prepPeriods={periods[i]} 
                totalStudents={getTotalStudents()} />);
        }
    
        return cards;
    };
    
    const getTotalStudents = () => {
        return getRandomNum(35, 20);
    };

    return (
        <article id="content">
            <Sidebar />
            <article id="cards">
                {generateCards(courses, periods)}
            </article>
        </article>
    );
}