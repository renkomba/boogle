import React from "react";
import { Content } from '../Content/Content';

const CourseSite = ({
    user, toggle, activePeriod, activePage, setActivePage
}) => {
    setActivePage('Course Site');
        
    return (
        <main className="CourseSite">
            <Content 
                id="assignments-container"
                cardIds={[]}
                user={user}
                viewByWeek={toggle}
                activePage={activePage}
                activePeriod={activePeriod}
            />
        </main>
    );
}

export default CourseSite;