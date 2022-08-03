import React from "react";
import { getOrdinalSuffix } from "../../../hooks/getOrdinalSuffix";
import './CalendarIcon.css';

export const CalendarIcon = () => {
    let [ today, months, days ] = [
        new Date(),
        [
            'January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    ];

    let [ day, month, weekday] = [
        String(today.getDate()).padStart(2, '0'),
        months[today.getMonth()],
        days[today.getDay()]
    ];

    let suffix = getOrdinalSuffix(day);

    return (
        <section id="date">
            <div id="date-container" title={`Today is ${weekday}, ${month} the ${day}${suffix}`}>
                <span id="month">{month.length > 4 ? `${month.slice(0, 3)}.` : month}</span><br/>
                <span id="day">{day}</span>
                <span id="ordinal-suffix"><sup>{suffix}</sup></span>
            </div>
        </section>
    );
}