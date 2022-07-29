import React from "react";
import './CompletionIcon.css';

// for missing icon, need to calculate if assignment is past due
// for stars, need to gauge whether we've clicked on a circle
const translateRate = completionRate => {
    return completionRate === 0 ? 'empty' 
        : completionRate === 1 ? 'full'
        : 'half'
}

export const CompletionIcon = props => {
    const icons = {
        circle: {
            full: 'fa-solid fa-circle-check',
            half : 'fa-solid fa-circle-half-stroke',
            empty : 'fa-solid fa-circle-notch',
            missing : 'fa-solid fa-circle-exclamation'
        },
        star: {
            full: 'fa-solid fa-star',
            half : 'fa-solid fa-star-half',
            empty : 'fa-regular fa-star'
        }
    };

    return (
        <i className={icons.circle[translateRate(props.completionRate)]}></i>
    );
}