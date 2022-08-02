// import { render } from '@testing-library/react';
import React, { useEffect, useState, createContext } from 'react';
import { 
  closestCorners,
  DndContext, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors } from '@dnd-kit/core';
import { Teacher } from '../../classes/Teacher';
import { Banner } from '../Banner/Banner';
import { Content } from '../Content/Content';
import { Footer } from '../Footer/Footer';
import './App.css';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

const dragNarration = {
  onDragStart(id) {
    console.log(`Picked up the ${id} card`);
  },
  onDragOver(id, overId) {
    if (overId) {
      console.log(`The ${id} card was moved over the ${overId} area`);
      return
    }
    console.log(`The ${id} card is no longer over a droppable area`);
  },
  onDragEnd(id, overId) {
    if (overId) {
      console.log(`The ${id} card was dropped over the ${overId} area`);
    }
    console.log(`The ${id} card was dropped`);
  },
  onDragCancel(id) {
    console.log(`Dragging cancelled. The ${id} card was dropped`);
  }
};

const App = () => {
  const [user, setUser] = useState(new Teacher());
  const [courses, setCourses] = useState(user.courseload);
  const [activeId, setActiveId] = useState();

  useEffect( 
    () => console.log(user), 
    [user.fullName]
  );

  const UserContext = createContext();
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

  const findContainer = courseId => {
    if (courseId in courses) return courseId;
    return Object.keys(courses).find(
      key => courses[key].includes(courseId)
    )
  };

  const handleDragStart = ({ active }) => setActiveId(active.id);
  const handleDragOver = ({ active, over, draggingRect }) => {
    let { id } = active;
    let { id: overId } = over;

    let [ containerActive, containerOver ] = [
      findContainer(id),
      findContainer(overId)
    ];

    if (
      !containerActive 
      || !containerOver
      || containerActive === containerOver
    ) return;
    
    setCourses( prev => {
      let [ coursesActive, coursesOver ] = [
        prev[containerActive],
        prev[containerOver]
      ];
      
      let [ iActive, iOver, iNew ] = [
        coursesActive.indexOf(id),
        coursesOver.indexOf(overId),
        0
      ];
      
      if (iOver in prev) {
        iNew = coursesOver.length + 1;
      } else {
        let isBelowLastItem = over
        && (iOver === coursesOver.length - 1)
        && (draggingRect.offsetTop > over.rect.offsetTop + over.rect.height);
        let modifier = isBelowLastItem ? 1 : 0;
        
        iNew = iOver >= 0 ? iOver + modifier : coursesOver.length + 1;
      }
      
      return {
        ...prev,
        [containerActive]: [
          ...prev[containerActive].filter( item => item !== active.id)
        ],
        [containerOver] : [
          ...prev[containerOver].slice(0, iNew),
          courses[containerActive][iActive],
          ...prev[containerOver].slice(iNew, prev[containerOver].length)
        ]
      }
    });
  };
  const handleDragEnd = ({ active, over }) => {
    let { id } = active;
    let { id: overId } = over;
    
    let [ containerActive, containerOver ] = [
      findContainer(id),
      findContainer(overId)
    ];
    
    if (
      !containerActive 
      || !containerOver
      || containerActive === containerOver
      ) return;
      
    let [ iActive, iOver ] = [
      containerActive.indexOf(id),
      containerOver.indexOf(overId)
    ];

    if (iActive !== iOver) {
      setCourses( items => ({
        ...items,
        [containerOver]: arrayMove(items[containerOver], iActive, iOver)
      }));
    };

    setActiveId(null);
  };
    
  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <Banner 
          user={user} 
          setUser={setUser} 
        />
        <DndContext
          collisionDetection={closestCorners}
          announcements={dragNarration}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <Content 
            id="card-container"
            courses={user.courses}
          />
        </DndContext>
        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;