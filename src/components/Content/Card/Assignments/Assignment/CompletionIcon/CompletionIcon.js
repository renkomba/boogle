import React from "react";
import './CompletionIcon.css';

// for missing icon, need to calculate if assignment is past due
// for stars, need to gauge whether we've clicked on a circle
const translateRate = completed => {
    return completed === 0 ? 'not' 
        : completed === 1 ? 'fully'
        : 'partly'
}

export const CompletionIcon = ({ rate }) => {
    const icons = {
        circle: {
            fully: 'fa-solid fa-circle-check',
            partly : 'fa-solid fa-circle-half-stroke',
            not : 'fa-solid fa-circle-notch',
            'not-missing' : 'fa-solid fa-circle-exclamation'
        },
        star: {
            fully: 'fa-solid fa-star',
            partly : 'fa-solid fa-star-half',
            not : 'fa-regular fa-star'
        }
    };

    return (
        <i className={icons.circle[translateRate(rate)]}></i>
    );
}