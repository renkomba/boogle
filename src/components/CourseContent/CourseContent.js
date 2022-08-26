import React, { useState, useEffect } from "react";
import AssignmentGroup from "./AssignmentGroup/AssignmentGroup";
import styles from './CourseContent.module.css';
import { 
    closestCorners,
    DndContext, 
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useDroppable,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {
    arrayMove,
    sortableKeyboardCoordinates,
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import AssignmentOverlay from "../Overlays/AssignmentOverlay";
import CategoryOverlay from "../Overlays/CategoryOverlay";
import CourseSidebar from "../Sidebar/CourseSidebar";
import AddButtons from "../Buttons/AddButtons";

const CourseContent = ({ activePeriod, id }) => {
    const [tags, setTags] = useState( activePeriod.course ?
        activePeriod.course.assignmentLabels 
        : activePeriod.assignmentLabels
    );
    const [activeIds, setActiveIds] = useState({
        bar: null,
        group: null
    });
    const [assignmentGroups, setAssignmentGroups] = useState(
        Object.fromEntries( activePeriod.course ? 
            activePeriod.course.assignmentLabels.map( tag => [
                tag,
                Object.values(activePeriod.assignments).filter(
                    Assignment => Assignment.label === tag
                ).map( Assignment => Assignment.id )
            ]) : activePeriod.assignmentLabels.map( tag => [
                tag,
                Object.values(activePeriod.assignments).filter(
                    Assignment => Assignment.label === tag
                ).map( Assignment => Assignment.id )
            ])
        )
    );

    useEffect(
        () => {
            assignmentGroups && setAssignmentGroups( 
                assignmentGroups => Object.fromEntries(
                    Object.keys(assignmentGroups).map( tag => [
                        tag, assignmentGroups[tag]
                    ]
                ))
            );
        },
        [tags]
    );
    
    const { setNodeRef : setContentNodeRef } = useDroppable({ id });
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 10 }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const startDraggingGroup = ({active: {id}}) => {
        setActiveIds( activeIds => ({ ...activeIds, group: id }))
    };

    const changeAcrossGroups = ({tag, tagOver, id, over, offsetTop}) => {
        setAssignmentGroups( assignmentGroups => {
            console.log(`1. ${id} was dragged out of its original group (${tag}) and into ${tagOver}!`);
            let [ groupActive, groupOver ] = [
                assignmentGroups[tag], assignmentGroups[tagOver]
            ];
            let [ iActive, iOver ] = [
                groupActive.indexOf(id), groupOver.indexOf(over.id)
            ];
            console.log(`iOver (${iOver}) ?== ${groupOver.length-1}`);
            console.log(`Dragged (${id}) is over ${over.id}`);
            console.log(`offsetTop (${offsetTop}) ?< over.rect.top (${over.rect.top})`);
            
            let iNew;
            console.log(`2. Looking for *${over.id}* in assignmentGroups:`);
            console.log(assignmentGroups);
            if (over.id in assignmentGroups) {
                iNew = groupOver.length + 1;
            } else {
                const isBelowLastItem = over
                    && iOver === groupOver.length - 1
                    && offsetTop < over.rect.top; //+ over.rect.height; ?
                
                isBelowLastItem && console.log(`${id} is below the last item in <==${over.data.current.sortable.containerId}==>.`);
                
                const modifier = isBelowLastItem ? 1 : 0;
                iNew = iOver >= 0 ? iOver + modifier : groupOver.length + 1
            };
            
            console.log(`3. So now ${id} is in the *${tagOver}* group`);

            return {
                ...assignmentGroups,
                [tag]: [...assignmentGroups[tag].filter(
                    assignment => assignment !== id
                )],
                [tagOver]: [
                    ...assignmentGroups[tagOver].slice(0, iNew),
                    assignmentGroups[tag][iActive],
                    ...assignmentGroups[tagOver].slice(
                        iNew, assignmentGroups[tagOver].length
                    )
                ]
            }
        })
    };

    const stopDraggingGroup = ({ active, over }) => {
        over = over ? over : 'OVER === null';
        console.log(active);
        console.log(over);
        let [id, idOver] = [active.id, over.id];
        console.log(`1. Dragged ${id} into ${idOver}'s spot`);
        console.log(id !== idOver ? 'Should set state' : 'BUG!');
        id !== idOver && changeGroups({
            tag: id,
            id: id,
            idOver: idOver
        });
        setTags( tags => ({ ...tags, active: null }));
    }

    const changeGroups = ({ tag, id, idOver }) => {
        console.log('<== OLD ASSIGNMENT GROUPS ==>');
        console.log(assignmentGroups);

        let forTabs = tag === id;
        let relevantGroup = forTabs ? Object.keys(assignmentGroups)
            : assignmentGroups[tag];
        let [ iOld, iNew ] = [
            relevantGroup.indexOf(id),
            relevantGroup.indexOf(idOver)
        ];

        let sortedGroup = arrayMove(relevantGroup, iOld, iNew);

        forTabs ? setAssignmentGroups( () => {
            console.log(`<== ${activePeriod.title.toUpperCase()} TAGS ==>`);
            console.log(relevantGroup);

            console.log(`<== NEWLY SORTED ${activePeriod.title.toUpperCase()} TAGS ==>`);
            console.log(sortedGroup);
            setAssignmentGroups(assignmentGroups => Object.fromEntries(
                sortedGroup.map( tag => [ tag, assignmentGroups[tag] ] )
            ));
        }) : setAssignmentGroups( assignmentGroups => {
            console.log(`<== ${tag.toUpperCase()} ASSIGNMENT GROUP ==>`);
            console.log(relevantGroup);

            console.log(`<== NEWLY SORTED ${tag.toUpperCase()} ASSIGNMENT GROUP ==>`);
            console.log(sortedGroup);
            
            let updatedAssignmentGroups = {
                ...assignmentGroups,
                [tag] : sortedGroup
            };
            console.log(`<== NEWLY SORTED ASSIGNMENT GROUPS ==>`);
            console.log(updatedAssignmentGroups);

            return updatedAssignmentGroups;
        })
    };

    function generateGroups(groups=[]) {
        for (let tag in assignmentGroups) {
            groups.push(<AssignmentGroup 
                key={tag}
                tag={tag}
                activePeriod={activePeriod}
                changeGroups={changeGroups}
                group={assignmentGroups[tag]}
                changeAcrossGroups={changeAcrossGroups}
                activeIds={activeIds}
            />);
        }
        return groups;
    };

    const filterByTag = (tags=[]) => {
        tags = !tags.some(e => typeof e === typeof []) ? tags 
            : tags.find( e => typeof e === typeof []);

        setAssignmentGroups(Object.fromEntries(tags.map( tag => [
            tag,
            Object.values(activePeriod.assignments).filter(
                Assignment => Assignment.label === tag
            ).map( Assignment => Assignment.id )
        ])));
    };

    // Sortable <Assignment Bar /> functions
    const startDraggingBar = ({active: {id}}) => setActiveIds(
        activeIds => ({
            ...activeIds,
            bar: id
        })
    );
    
    const findGroup = id => {
        return id in assignmentGroups ? id 
            : Object.keys(assignmentGroups).find(
                tag => assignmentGroups[tag].includes(id)
            );
    }

    const findTag = barId => {
        return Object.keys(assignmentGroups).filter(
            tag => assignmentGroups[tag].includes(barId)
        )[0];
    }

    const dragBarOver = ({
        activatorEvent: {target: {offsetTop}},
        active: {id},
        over
    }) => {
        const [ tag, tagOver ] = [findGroup(id), findGroup(over.id)];
        console.log(`Dragged ${id} (${tag}) over ${over.id} (${tagOver})`);

        if (!tag || !tagOver || tag === tagOver) return

        changeAcrossGroups({
            tag: tag,
            tagOver: tagOver,
            id: id,
            over: over,
            offsetTop: offsetTop
        });
    }
    const stopDraggingBar = ({ active: {id}, over: {id: idOver} }) => {
        // debugger;
        console.log(`1. Dragged ${id} into ${idOver}'s spot`);
        console.log(id !== idOver ? 'Should set state' : 'BUG!');
        id !== idOver && changeGroups({
            tag: findTag(id),
            id: id,
            idOver: idOver
        });
        setActiveIds( activeIds => ({...activeIds, bar: null}) );
    }

    return (
        <div className={styles.course_content}>
            <CourseSidebar activePeriod={activePeriod}
                filterByTag={filterByTag}
            />

            <div className={styles.buttons_and_assignments}>
                <section className={styles.assignment_groups}>
                    <DndContext sensors={sensors}
                        collisionDetection={closestCorners}
                        onDragStart={startDraggingGroup}
                        onDragEnd={stopDraggingGroup}
                    >
                        <SortableContext items={Object.keys(assignmentGroups)}
                            strategy={verticalListSortingStrategy}
                        >
                            <DndContext sensors={sensors}
                                collisionDetection={closestCorners}
                                onDragStart={startDraggingBar}
                                onDragOver={dragBarOver}
                                onDragEnd={stopDraggingBar}
                            >
                                <article ref={setContentNodeRef}
                                    className={styles.assignmentGroups}
                                >
                                    {generateGroups()}
                                </article>
                                <DragOverlay>
                                    {activeIds.bar && 
                                        <AssignmentOverlay 
                                            id={activeIds.bar}
                                            label={activePeriod.course ?
                                                activePeriod.course.assignments[activeIds.bar].title
                                                : activePeriod.assignments[activeIds.bar].title}
                                    /> }
                                </DragOverlay>
                            </DndContext>
                        </SortableContext>
                        <DragOverlay>
                            {activeIds.group ? <CategoryOverlay 
                                id={activeIds.group}
                                tag={activeIds.group}
                                assignments={Object.values(
                                    assignmentGroups[activeIds.group]
                                )}
                            /> : null}
                        </DragOverlay>
                    </DndContext>
                </section>
                <AddButtons />
            </div>

        </div>
    );
}

export default CourseContent;