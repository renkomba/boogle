import getRandomNum from "../components/functions/getRandomNum";
import Assignment from "./Assignment";
import Period from "./Period";

export default class Course {
    constructor(title='', periods=[]) {
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
            let type = this.parseAssignment();
            let id = `${this.id}-task-#${i + 1}`;
            assignments[id] = new Assignment(type, this, i+1);
        }
        return assignments
    }

    parseAssignment() {
        const types = [ 'assignment', 'assessment', 'application', 'resource' ];
        const type = types[getRandomNum(types.length)];
        return type;
    }
}