import React from "react";
import styles from './Icon.module.css';

const Icon = ({ type, suffix }) => {
    let prefix = type === 'solid' ? 'fa-solid '
        : type === 'brand' ? 'fa-brands ' 
        : 'fa-regular ';

    let faIcon = prefix + 'fa-' + suffix;

    return (
        <i className={`icon ${faIcon}`}></i>
    );
}

export default Icon;