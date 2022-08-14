import getRandomNum from "../components/functions/getRandomNum";

export default class Assignment {
    constructor(type, Course, ordinalNum) {
        this._type = type;
        this.course = Course;
        this.ordinalNum = ordinalNum;
        this._label = ordinalNum === 2 && this.course.title !== 'Advisory' ?
            'Class Docs' : ordinalNum === 1 ?
            'Class Docs' : this.getLabel();
        this.title = ordinalNum === 1 ? `${this.course.title} Syllabus` 
            : ordinalNum === 2 && this.course.title !== 'Advisory' ? 'The Lexicon'
            : this.course.title === 'Advisory' ? this.getAdvisoryTitle(this.label)
            : this.getTitle(this.type);
        this._submissions = 0;
        this.isCompleted = false;
        this.isInProgress = false;
    }

    set type(newType) {
        this._type = newType;
    }

    set label(newLabel) {
        this._label = newLabel;
    }

    get type() {
        return this._type;
    }

    get label() {
        return this._label;
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
        const id = this.course.id === 'advisory' ? 'advisory'
            : this.course.id.split('-')[1];

        const labels = {
            1: ['About Me', 'My Family', 'My School', 'Food', 'Clothing'],
            2: ['My Activities', 'My Home Life', 'Around Town / Travel', 'Health & Filtness', 'Story'],
            3: ['My Memories', 'Teen Life', 'My Future', 'Conservation & Ecology', 'Literature & Media'],
            4: ['Heritage & Culture', 'Technology & Innovation', 'Social Issues', 'World Health & Environment', 'Consumerism'],
            5: ['En Afrique', 'En Asie', 'Au Moyen Orient', 'En Europe', 'En Amérique'],
            advisory: ['Forms', 'Presentations', 'Sign Ups', 'Surveys']
        }
        return labels[id][getRandomNum(labels[id].length)];
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
                'Grammar notes', 'Culture notes', 'Unit notes', 'Unit Choiceboard'
            ],
            site: ['WordReference', 'Pear Deck', 'This Is Language', 'Blooket', 'Kahoot', 'Duolingo Classroom']
        };
        
        let validTitles = titles[type].slice(0);
        let title = validTitles[getRandomNum(validTitles.length)];

        this.label = type === 'site' ? 'Class Docs' : this.label;
        return title;
    }
    
    getAdvisoryTitle(label) {
        console.log(label);

        const titles = {
            Forms: ['Impact Aid', 'Course Selection', 'Tutoring', 'Activities Permission'],
            Surveys: ['Mental Health', 'Club Interest', 'Spirit Week', 'Guest Speaker', 'Club Discussion', 'Heritage Month Event', 'School Climate'],
            'Sign Ups': ['Heritage Night', 'Spring Musical', 'Winter Play', 'Poetry Night', 'Canned Food Drive', 'Club Fundraiser', 'Class Fundraiser'],
            Presentations: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        };

        let validTitles = titles[label];
        let title = `${validTitles[getRandomNum(validTitles.length)]} ${label.slice(0, label.length - 1)}`;

        this.type = label === 'Presentations' ? this.course.assignmentTypes[0]
            : this.course.assignmentTypes[1];

        return title;
    }
}