import React, { useEffect, useState } from "react";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import styles from './Tabs.module.css';

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

const Tabs = ({ activePeriod }) => {
    const [tabs, setTabs] = useState(
        activePeriod.course.assignmentLabels.sort(
            (currentWord, previousWord) =>
                previousWord === 'Class Docs' ? 1
                    : currentWord.localeCompare(previousWord)
        ).map( label => addToggle(label) )
    );

    useEffect(
        () => {
            setTabs(
                activePeriod.course.assignmentLabels.sort(
                    (currentWord, previousWord) => 
                        previousWord === 'Class Docs' ? 1
                            : currentWord.localeCompare(previousWord)
                ).map( label => addToggle(label) )
            );
        },
        [activePeriod]
    );

    let labels = activePeriod.course.assignmentLabels;

    const filterAssignmentGroups = (tabs=[]) => {
        // only show matching assignment groups
        return
    }

    return (
        <aside className={styles.tabs}>
            <ToggleButtonGroup
                className={styles.verticalButtonGroup}
                onChange={filterAssignmentGroups}
                name="assignment-labels"
                type="checkbox"
                size="sm"
                vertical
            >
                <ToggleButton
                    id="label-all"
                    className={styles.allLabels}
                    value={labels}
                    defaultChecked
                >All</ToggleButton>

                {tabs}

                <ToggleButton
                    id="label-add"
                    className={styles.add}
                    value={labels}
                    onChange={() => setTabs(
                        prevTabs => [
                            prevTabs, 
                            addToggle(
                                prompt('New tab name'),
                                labels.length + 1
                            )
                        ] 
                    )}
                >
                    <i className="fa-solid fa-plus"></i>
                </ToggleButton>
            </ToggleButtonGroup>
        </aside>
    );
}

export default Tabs;