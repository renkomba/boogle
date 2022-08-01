// import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Teacher } from '../../classes/Teacher';
import { Banner } from '../Banner/Banner';
import { Content } from '../Content/Content';
import { Footer } from '../Footer/Footer';
import './App.css';

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
  useEffect( 
    () => console.log(user), 
    [user]
  );

  

  return (
    <div className="App">
      <Banner user={user} setUser={setUser} />
      <DndContext>
        <Content courseload={user.courseload} />
      </DndContext>
      <Footer />
    </div>
  );
}

export default App;
