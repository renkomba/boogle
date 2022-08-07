import getRandomNum from "../components/functions/getRandomNum";

export default class Period {
    constructor(title='', courseId, period, assignments) {
        this.title = title;
        this.period = period;
        this.courseId = courseId;
        this.assignments = assignments;
        this.totalStudents = period === 'ct' ? 
            0 : getRandomNum(35, 20);
    }

    get id() {
        return `${this.courseId}-${this.period.split(' ')[0]}`;
    }

    fetchStudentsArr() {
        //use this.totalStudents to generate an object
        //of Student instances (StudentId: name, course, period)
    }
}