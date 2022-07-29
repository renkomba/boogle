import React from "react";
import './MaximiseIcon.css';

export const MaximiseIcon = ({ style }) => {
    return (
        <div className="action-icon">
            <i className="fa-solid fa-maximize"
                style={style}></i>
        </div>
    );
}