import React from "react";
import './Prep.css';

export const Prep = ({ prep, verticalHeader }) => {
    return (
        <h2 className={`prep ${verticalHeader ? 'vertical' : 'horizontal'}`}>
            {prep}
        </h2>
    );
}