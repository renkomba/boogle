import React, { useState } from "react";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Period from "../../../classes/Period";
import Input from "../../Prompts/Input";
import styles from './Tags.module.css';

const addToggle = (label='') => {
    return (
        <ToggleButton
            key={label.split(' ').join('-')}
            id={label.split(' ').join('-')}
            className={styles.tab}
            value={label}
        >{label}</ToggleButton>
    );
}

const Periods = ({ activePeriod }) => {
    const [showPrompt, setShowPrompt] = useState(false);
    const [periods, setPeriods] = useState(
        activePeriod.course.periods.map(
            Period => addToggle(Period.period)
        )
    );

    // useEffect(
    //     () => {
    //         setPeriods(activePeriod.course.periods.map(
    //             Period => addToggle(Period.period)
    //         ));

    //         showPrompt && setShowPrompt(false);
    //     },
    //     [activePeriod]
    // );

    const handleToggle = ({ target: {value} }) => {
        setPeriods( prevPeriods => [
            ...prevPeriods,
            new Period(
                activePeriod.title, 
                activePeriod.course, 
                value
            )
        ] );
        setShowPrompt(false);
    }

    // const filterAssignmentGroups = selectedLabelsArr => {
    //     console.log('filtering by tag:');
    //     console.log(selectedLabelsArr);
    //     return
    // }

    return (
        <article className={styles.tabs}>
            <h4>Periods</h4>
            <ToggleButtonGroup
                className={styles.verticalButtonGroup}
                // onChange={setActivePeriod}
                name="course-periods"
                type="checkbox"
                size="sm"
                vertical
            >
                { periods.length > 2 && <ToggleButton
                    id="label-all"
                    className={styles.allLabels}
                    value={periods}
                    defaultChecked
                >All</ToggleButton>}

                {periods}

                {!showPrompt ? <Input 
                    contentType='period'
                    inputType='number'
                    handleToggle={handleToggle} 
                /> : <ToggleButton
                    id="label-add"
                    className={styles.add}
                    value={periods}
                    onClick={setShowPrompt(true)}
                >
                    <i className="fa-solid fa-plus"></i>
                </ToggleButton>}
            </ToggleButtonGroup>
        </article>
    );
}

export default Periods;