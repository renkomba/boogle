// import { render } from '@testing-library/react';
import React, { useState } from 'react';
import Teacher from '../classes/Teacher';
import Dashboard from './pages/Dashboard';
import CourseSite from './pages/CourseSite';
import Banner from './Banner/Banner';
import Footer from './Footer/Footer';
import './App.css';
import { Outlet } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import PeriodBanner from './Banner/PeriodBanner/PeriodBanner';

const App = () => {
  const [user, setUser] = useState(new Teacher());
  const [toggle, setToggle] = useState(true);
  const [activePeriod, setActivePeriod] = useState(user.periods.nonCts[0]);
  const [activePage, setActivePage] = useState('Dashboard');
  console.log('App.js activePeriod:');
  console.log(activePeriod);
  // console.log(user.periods.nonCts);

  return (
    <div className="App">
      { activePage === 'Course Site' ?
        <PeriodBanner 
          periods={user.periods}
          activePeriod={activePeriod}
          setActivePeriod={setActivePeriod}
          setActivePage={setActivePage}
        /> : <Banner 
          user={user}
          setUser={setUser}
          toggle={toggle}
          setToggle={setToggle}
        />
      }

      <Routes>
        <Route 
          index 
          element={<Dashboard 
            user={user}
            toggle={toggle}
            activePage={activePage}
            setActivePage={setActivePage}
            activePeriod={activePeriod}
            setActivePeriod={setActivePeriod}
            />} 
            />
        <Route
          path='pages/CourseSite' 
          element={<CourseSite 
            user={user}
            toggle={toggle}
            activePeriod={activePeriod}
            activePage={activePage}
            setActivePage={setActivePage}
          />} 
        />
      </Routes>

      <Outlet 
        user={user}
        toggle={toggle}
      />

      <Footer />
    </div>
  );
}

export default App;