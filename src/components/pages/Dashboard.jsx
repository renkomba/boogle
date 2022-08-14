import React, { useEffect, useState } from 'react';
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
    
const Dashboard = ({ user, toggle, activePage, setActivePage, activePeriod, setActivePeriod }) => {
    const [cardIds, setCardIds] = useState([]);

    useEffect( 
        () => {
            setCardIds(!toggle ? user.periodIds 
                : user.courses.map(Course => Course.id) );
            console.log(user);
        }, 
        [user.fullName, toggle]
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
    
    const handleDragEnd = ({ active, over }) => {
        if (active.id !== over.id) {
            setCardIds( () => {
                let [iOld, iNew] = [
                cardIds.indexOf(active.id),
                cardIds.indexOf(over.id)
                ];
        
                return arrayMove(cardIds, iOld, iNew)
            });
        }
    };

    return (
        <main className='Dashboard'>
            <DndContext
                collisionDetection={closestCorners}
                // onDragStart={handleDragStart}
                // onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                sensors={sensors}
            >
                <Content 
                    id="card-container"
                    cardIds={cardIds}
                    user={user}
                    viewByPrep={toggle}
                    page={'Dashboard'}
                    activePage={activePage}
                    setActivePage={setActivePage}
                    activePeriod={activePeriod}
                    setActivePeriod={setActivePeriod}
                />
            </DndContext>
        </main>
    );
}

export default Dashboard;