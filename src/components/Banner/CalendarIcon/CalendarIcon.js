import React from "react";
import getOrdinalSuffix from "../../functions/getOrdinalSuffix";
import styles from './CalendarIcon.module.css';

const CalendarIcon = () => {
    let [ today, months, days ] = [
        new Date(),
        [
            'January', 'February', 'March', 'April', 
            'May', 'June', 'July', 'August', 
            'September', 'October', 'November', 'December'
        ],
        [
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
            'Friday', 'Saturday', 'Sunday'
        ]
    ];

    let [ day, month, weekday] = [
        String(today.getDate()).padStart(2, '0'),
        months[today.getMonth()],
        days[today.getDay()]
    ];

    let suffix = getOrdinalSuffix(day);

    return (
        <section className={styles.date}>
            <div className={styles.date_container} 
                title={`Today is ${weekday}, ${month} the ${day}${suffix}`}
            >
                <span className={styles.month}>
                    {month.length > 4 ? `${month.slice(0, 3)}.` : month}
                </span><br/>
                <span className={styles.day}>{day}</span>
                <span className={styles.ordinal_suffix}>
                    <sup>{suffix}</sup>
                </span>
            </div>
        </section>
    );
}

export default CalendarIcon;