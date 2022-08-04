import React, { useState } from "react";
import './Sidebar.css';
import { SidebarIcon } from "./SidebarIcon/SidebarIcon";

export const Sidebar = () => {
    const [goRight, setGoRight] = useState(true);

    // If user is teacher, show classes performance by class w/ expecation at top.
    // If student, show classes performance by class w/ their score under expectation
    return (
        <aside id="sidebar">
            <div 
                id="side-modal" 
                style={goRight ? {width: '0vw'} 
                    : {color: 'var(--deep-colour)', width: 'calc(100vw - 3rem)'}}
            >
                <table style={goRight ? {display: 'none'} : {display: 'block'}}>
                    <thead>
                        <tr>
                            <th colSpan="4">Student Progress</th>
                        </tr>
                        <tr>
                            <td>Student</td>
                            <td>Class</td>
                            <td>Period</td>
                            <td># Complete</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Harry Potter</td>
                            <td>Potions</td>
                            <td>3rd Period</td>
                            <td>12 / 33</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="bar"
                onClick={() => setGoRight(!goRight)}>
                <SidebarIcon goRight={goRight} />
            </div>
        </aside>
    );
}