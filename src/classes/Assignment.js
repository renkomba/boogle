import getRandomNum from "../components/functions/getRandomNum";

export default class Assignment {
    constructor(type, Course, ordinalNum) {
        this.type = type;
        this.course = Course;
        this.title = this.getTitle(this.type);
        this.ordinalNum = ordinalNum;
        this._submissions = 0;
        this.isCompleted = false;
        this.isInProgress = false;
        this.label = this.getLabel();
    }

    get id() {
        return `${this.course.title.toLowerCase().split(' ').join('-')}-task-#${this.ordinalNum}`;
    }

    get submissions() {
        return this._submissions;
    }

    set submissions(num) {
        this._submissions += num;

        let completionRate = this._submissions / this.totalStudents;
        this.isCompleted = completionRate === 1 ? true : false;
        this.isInProgress = completionRate%1 > 0 ? true : false;
    }

    getLabel() {
        const labels = ['Unit 1', 'Unit 2', 'Unit 3'];
        return labels[getRandomNum(labels.length)];
    }
    
    getCompletionStatus(submissionFraction=0) {
        return submissionFraction === 1 ? true : false
    }

    getTitle(type) {
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
            ],
            resource: [
                'Grammar notes', 'Culture notes', 'Unit notes',
                'WordReference', 'Pear Deck', 'Unit Choiceboard'
            ]
        };

        let validTitles = titles[type];
        let title = validTitles[getRandomNum(validTitles.length)];

        return title;
    }
}