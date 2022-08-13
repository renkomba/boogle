import getRandomNum from "../components/functions/getRandomNum";
import Assignment from "./Assignment";
import Period from "./Period";

export default class Course {
    constructor(title='', periods=[]) {
        this._assignmentTypes = [
            'resource',
            'assignment',
            'assessment',
            'application'
        ];

        this.title = title;
        this.assignments = this.fetchAssignments();
        this.periods = periods.map( 
            period => new Period(title, this, period) 
        );
        
        this.totalStudents = this.periods.reduce( 
            (runningTotal, Period) => runningTotal + Period.totalStudents,
            0
        );
    }

    get assignmentTypes() {
        return this._assignmentTypes;
    }

    get assignmentLabels() {
        let labels = [];
        for (let id in this.assignments) {
            let assignment = this.assignments[id];
            let label = assignment.label;
            !labels.includes(label) && labels.push(label);
        }
        return labels;
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
            let type = i === 0 ? 'resource' : this.parseAssignment();
            let id = `${this.id}-task-#${i + 1}`;
            assignments[id] = new Assignment(type, this, i+1);
        }
        return assignments
    }

    parseAssignment() {
        const types = this.assignmentTypes;
        const type = types[getRandomNum(types.length)];
        return type;
    }
}