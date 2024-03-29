import React from "react";
import styles from './SettingsIcon.module.css';

const SettingsIcon = ({ toggle, setToggle }) => {
    return (
        <section className={styles.settings}
            onClick={ () => setToggle(!toggle) }
        >
            <i className="fa-solid fa-sliders"></i>
        </section>
    );
}

export default SettingsIcon;