import React, { useEffect, useState } from 'react';
import { 
    closestCorners,
    DndContext, 
    KeyboardSensor, 
    PointerSensor, 
    useSensor, 
    useSensors 
} from '@dnd-kit/core';
import { 
    arrayMove, 
    sortableKeyboardCoordinates 
} from '@dnd-kit/sortable';
import Content from '../components/Content/Content';
    
const Dashboard = ({ user, toggle }) => {
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
            activationConstraint: { distance: 10 }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );
    
    const handleDragEnd = ({ active, over }) => {
        active.id !== over.id && setCardIds( () => {
            let [iOld, iNew] = [
                cardIds.indexOf(active.id),
                cardIds.indexOf(over.id)
            ];
            return arrayMove(cardIds, iOld, iNew)
        });
    };

    return (
        <main className='Dashboard'>
            <DndContext sensors={sensors}
                onDragEnd={handleDragEnd}
                collisionDetection={closestCorners}
            >
                <Content user={user}
                    cardIds={cardIds}
                    viewByPrep={toggle}
                    id="card-container"
                />
            </DndContext>
        </main>
    );
}

export default Dashboard;