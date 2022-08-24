// import { render } from '@testing-library/react';
import React, { useState } from 'react';
import Teacher from '../classes/Teacher';
import Main from './Main/Main';

// set variable if undefined: let var 
// A. var ??= newVal;
// B. var = var ?? newVal

const App = () => {
  const [user, setUser] = useState(new Teacher());
  const [activePage, setActivePage] = useState('Dashboard');

  const changeUser = () => setUser(new Teacher());
  const changePage = page => setActivePage(
    page === 'Dashboard' ? 'Course Site' : 'Dashboard'
  );

  return (
    <div className="App">
      <Main user={user}
        activePage={activePage}
        changePage={changePage}
        changeUser={changeUser}
      />
    </div>
  );
}

export default App;