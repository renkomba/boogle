import React, { useEffect, useState } from "react";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
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

const Tags = ({ activePeriod }) => {
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

    const filterAssignmentGroups = selectedLabelsArr => {
        console.log('filtering by tag:');
        console.log(selectedLabelsArr);
        return
    }

    return (
        <article className={styles.tabs}>
            <ToggleButtonGroup onChange={filterAssignmentGroups}
                className={styles.verticalButtonGroup}
                name="assignment-labels"
                type="checkbox"
                size="sm"
                vertical
            >
                <ToggleButton className={styles.allLabels}
                    id="label-all"
                    value={labels}
                    defaultChecked
                >All</ToggleButton>

                {tabs}

                <ToggleButton id="label-add"
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
        </article>
    );
}

export default Tags;