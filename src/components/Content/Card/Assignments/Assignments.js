import React from "react";
import { AssignmentCompletion } from "./Assignment/AssignmentCompletion/AssignmentCompletion";
import { AssignmentTitle } from "./Assignment/AssignmentTitle/AssignmentTitle";
import { AssignmentType } from "./Assignment/AssignmentType/AssignmentType";
import { CompletionIcon } from "./Assignment/CompletionIcon/CompletionIcon";
import './Assignments.css';

export const Assignments = ({ assignments, totalStudents, minimised }) => {
    return (
        <table className="assignments"
            style={minimised ? {display: 'none'} : {display: ''}}>
            <tbody>
                {Object.values(assignments).map( assignment => {
                    let [id, type, title, submissions] = assignment;
                    return(
                    <tr key={id} id={id} className="assignment">
                        <td className="icon"><CompletionIcon rate={submissions / totalStudents} /></td>
                        <td className="type"><AssignmentType type={type} /></td>
                        <td className="title"><AssignmentTitle title={title} /></td>
                        <td className="submissions"><AssignmentCompletion
                            submissions={submissions}
                            totalStudents={totalStudents}
                        /></td>
                    </tr>
                )})}
            </tbody>
        </table>
    );
}