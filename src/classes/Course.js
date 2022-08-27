import getRandomNum from "../components/functions/getRandomNum";
import Assignment from "./Assignment";
import Period from "./Period";

export default class Course {
    constructor(title='', periods=[], user) {
        this._assignmentTypes = [
            'resource',
            'assignment',
            'assessment',
            'application',
            'site',
            'link'
        ];

        this.user = user;
        this.title = title;
        this.assignments = this.fetchAssignments();
        this._periods = periods.map( 
            period => new Period(title, this, period) 
        );
        
        this.totalStudents = this.periods.reduce( 
            (runningTotal, Period) => runningTotal + Period.totalStudents,
            0
        );
        this._assignmentLabels = this.initiateLabels();
    }

    get assignmentTypes() {
        return this._assignmentTypes;
    }

    get assignmentLabels() {
        return this._assignmentLabels;
    }

    set assignmentLabels(labelsArr=[]) {
        this._assignmentLabels = [...this._assignmentLabels, ...labelsArr];
    }
    
    get id() {
        return this.title.toLowerCase().split(' ').join('-');
    }
    
    get periodIds() {
        return this.periods.map( Period => Period.id);
    }

    get periods() {
        return this._periods;
    }

    set periods(newPeriod) {
        if (this._periods.some( 
            Period => Period.period === newPeriod.period
        )) return;
        
        this._periods.push(newPeriod);
        this._periods.sort( 
            (a, b) => a.period.localeCompare(b.period) 
        );

        this.totalStudents += newPeriod.totalStudents;
    }
    
    initiateLabels() {
        let labels = [];
        for (let id in this.assignments) {
            let assignment = this.assignments[id];
            let label = assignment.label;
            !labels.includes(label) && labels.push(label);
        }
        return labels;
    }

    addAssignment(type='', tag=false) {
        let assignment = new Assignment(
            type, 
            this, 
            Object.keys(this.assignments).length + 1);
        assignment.title = `New ${type[0].toUpperCase() + type.slice(1)}`;
        if (tag) assignment.label = tag;

        this.assignments[assignment.id] = assignment;
        return assignment;
    }

    copyToPeriods(period='', assignment) {
        let periods = period === this.title ? this.periods 
            : [this.periods.find(
                Period => Period.id === period
            )];
        console.log(periods);

        for (let Period of periods) {
            let i = Object.keys(Period.assignments).length + 1;
            let id = `${this.id}-task-#${i}`;
            Period.assignments[id] = assignment;
        }
    }

    fetchStudentsArr() {
        //use this.totalStudents to generate an object
        //of Student instances (StudentId: name, course, period)
    }

    fetchAssignments() {
        const [ amount, assignments ] = [ getRandomNum(11, 3), {} ];
        for (let i = 0; i < amount; i++) {
            let type = i === 0 ? this.assignmentTypes[0]
                : i === 1 && this.title !== 'Advisory' ? 
                this.assignmentTypes[4] : this.parseAssignment();
                
            let id = `${this.id}-task-#${i + 1}`;

            assignments[id] = new Assignment(type, this, i+1);

            // arr of Assignments that are "sites" with the title
            // of the recently-added (this) Assignment
            let sites = Object.values(assignments)
                .filter(Assignment => 
                    Assignment.type === 'site' 
                        && Assignment.title === assignments[id].title
                );
            
            // If this Assignment is a duplicate, delete it
            // and decrement i so we can redo
            if (sites.length > 1) {
                delete assignments[id];
                i--;
            }
        }
        return assignments
    }

    // randomly select assignment from among the list of types
    // except for the last entry (link) because I don't want to
    // create a placeholder array for those
    parseAssignment() {
        const types = this.assignmentTypes.slice(0);
        types.pop();

        const type = types[getRandomNum(types.length)];
        return type;
    }
}