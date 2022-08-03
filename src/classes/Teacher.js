import { getOrdinalSuffix } from "../hooks/getOrdinalSuffix";
import { getRandomNum } from "../hooks/getRandomNum";
import { shuffleArray } from "../hooks/shuffleArray";
import { Course } from "./Course";
import { User } from "./User";

export class Teacher extends User {
    constructor(subject='French', level='High', school='Woodhouse') {
        super(level, school);

        this.subject = subject === 'French' ? subject 
                : subject[0].toUpperCase() + subject.slice(1).toLowerCase();
        this.courseload = this.getSchedule(this.subject);
        this.courses = this.generateCourses(this.courseload);
    }

    get displayName() {
        return `${this.title} ${this.lastName}`;
    }

    get jobTitle() {
        return `${this.subject} Language Teacher`;
    }

    get title() {
        return this.subject === 'French' ? 'Mme'
            : this.subject === 'Spanish' ? 'Sra.'
            : 'Ms.'
    }

    getSchedule(subject='French') {
        let levels = [1, 2, 3, 4, 5];
        let [preps, numOfPreps] = this.getPreps(subject, levels);

        for (let repeatClasses = 5 - numOfPreps; repeatClasses > 0; repeatClasses--) {
            let prep = Object.keys(preps)[getRandomNum(numOfPreps)];
            preps[prep].push(preps[prep][0]);
        }

        return this.getCourses(Object.values(preps))
    }

    getCourses(prepValues=[], courses=['Planning','Planning']) {
        prepValues.forEach( prep => courses.push(...prep) );
        shuffleArray(courses);
        courses.splice(3, 0, 'Advisory');

        return this.getClassPeriods(courses)
    }

    getPreps(subject='French', levels=[1, 2, 3, 4, 5], preps={}) {
        let numOfPreps = getRandomNum(levels.length, 1);
        levels = levels.slice(0);

        while (Object.keys(preps).length < numOfPreps) {
            let prep = levels.splice(getRandomNum(levels.length), 1);
            preps[prep] = [`${subject} ${prep}`];
        }

        return [preps, numOfPreps];
    }

    getClassPeriods(courses=[], periods={}) {
        for (let i = 1; i <= courses.length; i++) {
            let [ course, period ] = [
                courses[i - 1],
                `${i}${getOrdinalSuffix(i)} Period`
            ];

            if (course === 'Planning') continue;

            if (course in periods) {
                periods[course].push(period);
            } else {
                periods[course] = [period];
            }
        }

        this.addCT(periods);
        return periods;
    }

    addCT(prepsObj={}) {
        for (let prep in prepsObj) {
            if (prep === 'Planning') {
                delete prepsObj[prep];
                continue;
            }

            prepsObj[prep].push('ct');
        }
    }

    generateCourses(courseload={}, courses=[]) {
        for (let course in courseload) {
            courses.push(new Course(course, courseload[course]));
        }
        return courses;
    }
}