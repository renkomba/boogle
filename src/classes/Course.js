import { getRandomNum } from "../hooks/getRandomNum";
import { Period } from "./Period";

export class Course {
    constructor(title='', periods=[]) {
        this.title = title;
        this.assignments = this.fetchAssignments();
        this.periods = periods.map( period => new Period(title, this.id, period, this.assignments) );
        this.totalStudents = this.periods.reduce( 
            (runningTotal, Period) => runningTotal + Period.totalStudents,
            0
        );
    }

    get id() {
        return this.title.toLowerCase().split(' ').join('-');
    }

    get periodIds() {
        return this.periods.map( Period => Period.id);
    }

    fetchStudentsArr() {
        //use this.totalStudents to generate an object
        //of Student instances (StudentId: name, course, period)
    }

    fetchAssignments() {
        const [ amount, assignments ] = [ getRandomNum(11, 3), {} ];
        for (let i = 0; i < amount; i++) {
            let id = `${this.title.toLowerCase().split(' ').join('-')}-task-#${i+1}`;
            assignments[id] = this.parseAssignment(id);
        }
        return assignments
    }

    parseAssignment(id='', assignmentId='test', type='', title='', submissions=0) {
        const [ isTest, statuses, types, titles ] = [
            assignmentId === 'test' ? true : false,
            [ 'fully', 'partly', 'not'],
            [
                'assignment', 
                'assessment', 
                'application'
            ],
            {
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
            }
        ];

        const completed = statuses[getRandomNum(statuses.length)];
        submissions = !isTest ? submissions
            : completed === 'partly' ? getRandomNum(this.totalStudents)
            : completed === 'fully' ? this.totalStudents : 0;

        type = !isTest ? type : types[getRandomNum(types.length)];

        const validTitles = titles[type];
        title = !isTest ? title : validTitles[getRandomNum(validTitles.length)]

        return [id, type, title, submissions];
    }
}