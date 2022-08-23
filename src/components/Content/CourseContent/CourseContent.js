import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button"
import AssignmentGroup from "./AssignmentGroup/AssignmentGroup";
import Tabs from "./Tabs/Tabs";
import styles from './CourseContent.module.css';
import { 
    closestCorners,
    DndContext, 
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {
    arrayMove,
    sortableKeyboardCoordinates
} from "@dnd-kit/sortable";
import BoogleDragOverlay from "../../BoogleDragOverlay/BoogleDragOverlay";

const CourseContent = ({ viewByWeek, activePeriod, id }) => {
    const [assignmentGroups, setAssignmentGroups] = useState(
        Object.fromEntries(activePeriod.course.assignmentLabels.map(
            label => [
                label,
                Object.values(activePeriod.assignments).filter(
                    Assignment => Assignment.label === label
                ).map( Assignment => Assignment.id )
            ]
        ))
    );
    const [activeId, setActiveId] = useState(null);

    useEffect(
        () => {
            setAssignmentGroups(
                Object.fromEntries(activePeriod.course.assignmentLabels.map(
                    label => [
                        label,
                        Object.values(activePeriod.assignments).filter(
                            Assignment => Assignment.label === label
                        ).map( Assignment => Assignment.id )
                    ]
                ))
            );
        },
        [activePeriod]
    );

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10
            }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const defaultAnnouncements = {
        onDragStart(id) {
            console.log(`Picked up ${id}`);
        },
        onDragOver(id, overId) {
            if (overId) {
                console.log(`${id} is over the ${overId} group`);
                return
            }
            console.log(`${id} is no longer over a drop zone.`);
        },
        onDragEnd(id, overId) {
            if (overId) {
                console.log(`Dropped ${id} into the ${overId} group`);
                return
            }
            console.log(`Dropped ${id}.`);
        }
    };

    function findContainer(id) {
        return id in assignmentGroups ? id
            : Object.keys(assignmentGroups).find(
                label => assignmentGroups[label].includes(id)
            );
    }

    function handleDragStart({ active: {id}}) {
        setActiveId(id);
    }

    function handleDragOver({
        activatorEvent: {target: {offsetTop}}, 
        active: {id}, 
        over
    }) {
        const idOver = over.id;
        const [ labelActive, labelOver ] = [
            findContainer(id), findContainer(idOver)
        ];

        if (
            !labelActive
            || !labelOver
            || labelActive === labelOver
        ) return;

        setAssignmentGroups(prevGroups => {
            let [ groupActive, groupOver ] = [
                prevGroups[labelActive], prevGroups[labelOver]
            ];
            let [ iActive, iOver ] = [
                groupActive.indexOf(id), groupOver.indexOf(idOver)
            ];

            // console.log(`iOver (${iOver}) ?== ${groupOver.length-1}`);
            // console.log(`Dragged (${id}) is over ${over.id}`);
            // console.log(`offsetTop (${offsetTop}) ?< over.rect.top (${over.rect.top})`);
            let iNew;
            if (idOver in prevGroups) {
                iNew = groupOver.length + 1;
            } else {
                const isBelowLastItem = over
                    && iOver === groupOver.length - 1
                    && offsetTop < over.rect.top; //+ over.rect.height;
                isBelowLastItem && console.log(`${id} is below the last item in <==${over.data.current.sortable.containerId}==>.`);
                const modifier = isBelowLastItem ? 1 : 0;
                iNew = iOver >= 0 ? iOver + modifier : groupOver.length + 1
            };

            return {
                ...prevGroups,
                [labelActive]: [...prevGroups[labelActive].filter(
                    label => label !== id
                )],
                [labelOver]: [
                    ...prevGroups[labelOver].slice(0, iNew),
                    assignmentGroups[labelActive][iActive],
                    ...prevGroups[labelOver].slice(iNew, prevGroups[labelOver].length)
                ]
            }
        });
    }

    function handleDragEnd({ active: {id}, over }) {
        const idOver = over.id;

        const [ labelActive, labelOver] = [
            findContainer(id), findContainer(idOver)
        ];

        if (
            !labelActive
            || !labelOver
            || labelActive !== labelOver
        ) return;

        const [ iActive, iOver ] = [
            assignmentGroups[labelActive].indexOf(id),
            assignmentGroups[labelOver].indexOf(idOver)
        ];

        if (iActive !== iOver) {
            setAssignmentGroups(prevGroups => ({
                ...prevGroups,
                [labelOver]: arrayMove(
                    prevGroups[labelOver],
                    iActive,
                    iOver
                )
            }));
        }
        setActiveId(null);
    }

    const generateGroups = (groups=[]) => {
        for (let label in assignmentGroups) {
            groups.push(<AssignmentGroup 
                key={label}
                id={label}
                sectionLabel={label}
                activePeriod={activePeriod}
                relevantAssignments={assignmentGroups[label]}
            />);
        }
        return groups;
    };

    return (
        <article className={styles.course_content}>
            <Tabs activePeriod={activePeriod} />
            <article className={styles.buttonsAndAssignments}>
                <section className={styles.buttons}>
                    <Button 
                        size="lg"
                        type="button"
                        className={`${styles.button} ${styles.secondaryBtn}`}
                        active
                    >
                        <i className="fa-solid fa-file-circle-plus">
                            <span>ADD RESOURCE</span>
                        </i>
                    </Button>
                    <Button 
                        size="lg"
                        type="button"
                        className={`${styles.button} ${styles.primaryBtn}`}
                        active
                    >
                        <i className="fa-solid fa-plus">
                            <span className={styles.work}>ADD WORK</span>
                        </i>
                    </Button>
                    <Button 
                        size="lg"
                        type="button"
                        className={`${styles.button} ${styles.secondaryBtn}`}
                        active
                    >
                        <i className="fa-solid fa-bullhorn">
                            <span>ADD ANNOUNCEMENT</span>
                        </i>
                    </Button>
                </section>
                <section className="assignments-and-labels">
                    <DndContext
                        announcements={defaultAnnouncements}
                        collisionDetection={closestCorners}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDragEnd={handleDragEnd}
                        sensors={sensors}
                    >
                        <article>
                            {generateGroups()}
                            <DragOverlay>
                                {activeId ? <BoogleDragOverlay 
                                    id={activeId}
                                    label={activePeriod.course.assignments[activeId].title}
                                /> : null }
                            </DragOverlay>
                        </article>
                    </DndContext>
                </section>
            </article>
        </article>
    );
}

export default CourseContent;