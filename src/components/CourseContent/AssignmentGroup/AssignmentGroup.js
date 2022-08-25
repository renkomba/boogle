import React from "react";
import AssignmentHeader from "./AssignmentHeader";
import AssignmentBar from "./AssignmentBar";
import styles from './AssignmentGroup.module.css';
import { 
//     closestCorners,
//     DndContext,
    // DragOverlay,
//     KeyboardSensor,
//     PointerSensor,
//     useDroppable,
//     useSensor,
//     useSensors
} from "@dnd-kit/core";
import { 
    // sortableKeyboardCoordinates,
    SortableContext,
    useSortable,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const AssignmentGroup = ({ tag, activePeriod, group, activeIds}) => {
    
    // For draggable GROUP
    const {
        attributes,
        listeners,
        setNodeRef: setDraggableGroupNodeRef,
        transform,
        transition
    } = useSortable({ id: tag });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    // const sensors = useSensors(
    //     useSensor(PointerSensor, {
    //         activationConstraint: { distance: 10 }
    //     }),
    //     useSensor(KeyboardSensor, {
    //         coordinateGetter: sortableKeyboardCoordinates
    //     })
    // );

    // const { setNodeRef: setGroupNodeRef } = useDroppable({
    //     id: tag
    // });

    const icons = {
        assignment: 'fa-solid fa-file-lines',
        assessment: 'fa-solid fa-file-lines',
        application: 'fa-solid fa-file-lines',
        resource: 'fa-regular fa-clipboard',
        site: 'fa-solid fa-globe',
        link: 'fa-solid fa-link'
    };

    const generateBarSpacer = (key = '#0') => {
        return (
            <div
                key={key} 
                className={styles.bar_spacer}
            >
                <i className="fa-solid fa-plus"></i>
                <div></div>
            </div>
        )
    }

    const populateAssignments = () => {
        let assignmentBars = [generateBarSpacer()];

        for (let id of group) {
            let assignment = activePeriod.course ? 
                activePeriod.course.assignments[id] 
                : activePeriod.assignments[id];
            let icon = assignment.type + ' ' + icons[assignment.type];
            assignmentBars.push(...[
                generateBar(icon, id, assignment),
                generateBarSpacer(assignment.id.slice(
                    assignment.id.length - 2
                ))
            ]);
        }

        return assignmentBars;
    };

    const generateBar = (icon, id, assignment) => {
        return (<AssignmentBar key={id}
            activeBarId={activeIds.bar}
            activePeriod={activePeriod}
            assignment={assignment}
            icon={icon}
            id={id}
        />);
    };

    return (
        <div>
            <SortableContext items={group}
                strategy={verticalListSortingStrategy}
            >
                <section className={styles.group}
                    ref={setDraggableGroupNodeRef}
                    // ref={setGroupNodeRef}
                    {...attributes}
                    {...listeners}
                    style={style}
                    key={tag}
                    id={tag}
                >
                    <AssignmentHeader sectionLabel={tag} />

                    <article className={styles.bars}>
                        {populateAssignments()}
                    </article>
                </section>
            </SortableContext>
        </div>
    );
}

export default AssignmentGroup;