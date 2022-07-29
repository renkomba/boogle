import React from "react";
import { getRandomNum } from "../../../../hooks/getRandomNum";
import { Assignment } from "./Assignment/Assignment";
import './Assignments.css';

export const Assignments = ({ totalStudents, minimised }) => {
    const generateAssignments = (amount=5, totalStudents=30) => {
        let assignments = [];
        for (let i = 0; i < amount; i++) {
            assignments.push(<Assignment key={`${i}9a`}
                assignmentId="test" 
                totalStudents={totalStudents} />);
        }
    
        return assignments;
    }

    return (
        <table className="assignments"
            style={minimised ? {display: 'none'} : {display: ''}}>
            <thead>
                <th>icon</th>
                <th>type</th>
                <th>title</th>
                <th>rate</th>
            </thead>
            <tbody>
                {generateAssignments(getRandomNum(11, 1), totalStudents)}
            </tbody>
        </table>
    );
}