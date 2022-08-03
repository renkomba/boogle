import React from "react";
import { getRandomNum } from "../../../../../hooks/getRandomNum";
import './Assignment.css';
import { AssignmentCompletion } from "./AssignmentCompletion/AssignmentCompletion";
import { AssignmentTitle } from "./AssignmentTitle/AssignmentTitle";
import { AssignmentType } from "./AssignmentType/AssignmentType";
import { CompletionIcon } from "./CompletionIcon/CompletionIcon";

const countSubmissions = (assignmentId, totalStudents) => {
    if (assignmentId === 'test') {
        let odds = ['full', 'half', 'empty'][getRandomNum(3)];
        return odds === 'full' ? totalStudents
            : odds === 'empty' ? 0
            : getRandomNum(totalStudents);
    }
}

const getAssignment = assignmentId => {
    if (assignmentId === 'test') {
        let assignmentType = getAssignmentType(assignmentId);
        return [assignmentType, getAssignmentTitle(assignmentId, assignmentType)]
    }
}

const getAssignmentType = assignmentId => {
    const types = ['assignment', 'assessment', 'application'];
    if (assignmentId === 'test') return types[getRandomNum(types.length)]
}

const getAssignmentTitle = (assignmentId, assignmentType) => {
    if (assignmentId === 'test') {
        const titles = {
            assignment: [
                'TIL vocab drill', 'TIL structure practice', 
                'Conjuguemos conjugation', 'Conjuguemos grammar in context',
                'TV5 reading comprehension', 'TV5 listening comprehension',
                'Flipgrid speaking practice', 'Partner dialogue'
            ],
            assessment: [
                'Roleplay with Madame', 'Conversation Wizer',
                'Dictation', 'Unit essay',
                'Reading & Listening MCQ', 'Read and listen to act'
            ],
            application: [
                'Checkout conversation with Madame', 'Respond to a tweet',
                'Write a comment to YouTube video', 'Write an article review'
            ]
        };

        const validTitles = titles[assignmentType];
        return validTitles[getRandomNum(validTitles.length)];
    }
}

export const Assignment = props => {
    const [ assignmentId, totalStudents ] = [ props.assignmentId, props.totalStudents ];
    let submissions = countSubmissions(assignmentId, totalStudents);
    const [assignmentType, assignmentTitle] = getAssignment(assignmentId)

    return (
        <tr className="assignment">
            <td><CompletionIcon completionRate={submissions / totalStudents} /></td>
            <td><AssignmentType type={assignmentType} /></td>
            <td><AssignmentTitle name={assignmentTitle} /></td>
            <td><AssignmentCompletion submissions={submissions} totalStudents={totalStudents} /></td>
        </tr>
    );
};