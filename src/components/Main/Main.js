import React, { useState } from "react";
import { Outlet, Routes, Route } from 'react-router-dom';
import Banner from '../Banner/Banner';
import CourseBanner from '../Banner/CourseBanner/CourseBanner';
import CourseSite from "../CourseSite";
import Dashboard from "../Dashboard";
import Footer from '../Footer/Footer';
import PageContext from "../../contexts/PageContext";
import UserContext from "../../contexts/userContext";
import '../App.css';
import styles from './Main.module.css';

const Main = ({ activePage, changePage, user, changeUser }) => {
    const [toggle, setToggle] = useState(true);
    const [activeCourse, setActiveCourse] = useState({
        course: user.courses[0],
        period: user.courses[0]
    });
    
    const toggleView = () => setToggle(!toggle);

    const changeCourse = ({ target: {className}}) => {
        let i = user.courses.map( Course => Course.title )
          .indexOf(activeCourse.title);
        
        className.includes('left') ? i-- : i++;
        
        setActiveCourse( prevObj => ({
            ...prevObj,
            course: user.courses[i]
        }));
    }

    const changePeriod = ({ target: {classList}}) => {
        classList = Array.from(classList);
        let [ courseTitle, isCourse ] = [
            classList.slice(0, 2).join(' '),
            classList[3] === 'course'
        ];
    
        let period;
        let course = user.courses.find(
          Course => Course.title === courseTitle
        );
        
        if (!isCourse) {
            let lastClass = classList[classList.length - 1];
            let numStr = lastClass[lastClass.length - 1];
            period = numStr === 'p' ? course.periods.slice(0).pop()
                : course.periods.find(
                    Period => Period.period.includes(numStr)
                );
        }
        
        setActiveCourse( () => ({
          course: course,
          period: isCourse ? course : period
        }));
    }

    const contexts = {
        user: {
            user: user,
            changeUser: changeUser,
            currentCourse: activeCourse.course,
            changeCourse: setActiveCourse,
            currentPeriod: activeCourse.period,
            changePeriod: changePeriod
        },
        page: {
            toggle: toggle,
            changePage: changePage
        }
    };

    const banner = {
        Dashboard: <Banner toggle={toggle} setToggle={toggleView}/>,
        'Course Site' : <CourseBanner changePage={changePage} 
            changeCourse={changeCourse}
            course={activeCourse.course}
        />
    };

    return (
        <UserContext.Provider value={contexts.user}>
            <PageContext.Provider value={contexts.page}>
                {banner[activePage]}

                <main style={styles.main_content}>
                    <Routes>
                        <Route index 
                            element={ <Dashboard user={user}
                                toggle={toggle}
                            /> } 
                        />
                        <Route path='/CourseSite' 
                            element={ <CourseSite toggle={toggle}
                                activePeriod={activeCourse.period}
                                changePage={changePage}
                                id='CourseSite'
                            /> } 
                        />
                    </Routes>

                    <Outlet user={user} toggle={toggle} />
                </main>

                <Footer />
            </PageContext.Provider>
        </UserContext.Provider>
    );
}
export default Main;