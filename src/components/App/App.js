// import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { Teacher } from '../../classes/Teacher';
import { Banner } from '../Banner/Banner';
import { Content } from '../Content/Content';
import { Footer } from '../Footer/Footer';
import './App.css';

const App = () => {
  const [user, setUser] = useState(new Teacher());
  useEffect( () => {
    console.log(user);
  }, 
    [user]
  );

  return (
    <div className="App">
      <Banner user={user} setUser={setUser} />
      <Content courseload={user.courseload} />
      <Footer />
    </div>
  );
}

export default App;
