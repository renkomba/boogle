import React, { useState } from "react";
import { 
    closestCorners,
    DndContext, 
    KeyboardSensor, 
    PointerSensor, 
    useSensor, 
    useSensors } from '@dnd-kit/core';
import { 
    arrayMove, 
    sortableKeyboardCoordinates 
} from '@dnd-kit/sortable';
import { Content } from '../Content/Content';

const CourseSite = ({
    user, toggle, activePeriod, activePage, setActivePage
}) => {
    const [assignmentIds, setAssignmentIds] = useState(
        Object.keys(activePeriod.assignments)
    );

    // useEffect( 
    //     () => {
    //         console.log(activePeriod);
    //         setAssignmentIds(!toggle ? user.periodIds 
    //             : user.courses.map(Course => Course.id) );
    //     }, 
    //     [user.fullName, toggle]
    // );

    setActivePage('Course Site');

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
    
    const handleDragEnd = ({ active, over }) => {
        if (active.id !== over.id) {
            setAssignmentIds( () => {
                let [iOld, iNew] = [
                assignmentIds.indexOf(active.id),
                assignmentIds.indexOf(over.id)
                ];
        
                return arrayMove(assignmentIds, iOld, iNew)
            });
        }
    };
        
    return (
        <main className="CourseSite">
            <DndContext
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
                sensors={sensors}
            >
                <Content 
                    id="assignments-container"
                    cardIds={assignmentIds}
                    user={user}
                    viewByWeek={toggle}
                    page={activePage}
                    activePeriod={activePeriod}
                />
            </DndContext>
        </main>
    );
}

export default CourseSite;