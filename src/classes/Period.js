import getRandomNum from "../components/functions/getRandomNum";

export default class Period {
    constructor(title='', course, period='') {
        this.title = title;
        this.course = course;
        this.period = period;
        this.courseId = this.course.id;
        this.assignments = this.course.assignments;
        this.totalStudents = period === 'ct' ? 
            0 : getRandomNum(35, 20);
        this._submissions = this.initialiseSubmissions();
    }

    get id() {
        return `${this.courseId}-${this.period.split(' ')[0]}`;
    }

    get submissions() {
        return this._submissions;
    }

    updateSubmissions(assignment, submissionNum=1) {
        let entry = this._submissions[assignment.id];
        entry.turnedIn += submissionNum;
        assignment.submissions = assignment.submissions + submissionNum;

        let newTotal = entry.turnedIn;
        let completionRate = newTotal / this.totalStudents;
        entry.isCompleted = completionRate === 1 ? true : false;
        entry.isInProgress = completionRate%1 > 0 ? true : false;
    }

    initialiseSubmissions() {
        const [ bools, obj ] = [ [true, false], {} ];

        for (let assignmentId in this.assignments) {
            let isCompleted = bools[getRandomNum(bools.length)];
            
            let isInProgress = isCompleted ? false 
                : bools[getRandomNum(bools.length)];
            
            let numTurnedIn = isCompleted === isInProgress ? 0
                : isCompleted ? this.totalStudents
                : getRandomNum(this.totalStudents);
            
            this.assignments[assignmentId].submissions = numTurnedIn;

            obj[assignmentId] = {
                turnedIn: numTurnedIn,
                isCompleted: isCompleted,
                isInProgress: isInProgress
            };
        }
        return obj;
    }

    fetchStudentsArr() {
        //use this.totalStudents to generate an object
        //of Student instances (StudentId: name, course, period)
    }
}