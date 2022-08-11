import getRandomNum from "../components/functions/getRandomNum";

export default class User {
    constructor(level='High', school='Woodhouse') {
        [ this.firstName, this.middleName, this.lastName ] = this.nameUser();
        [ this.level, this.school ] = arguments;
    }

    get schoolName() {
        return `${this.school} ${this.level} School`;
    }

    get displayName() {
        return this.concatName(false);
    }

    get fullName() {
        return this.concatName();
    }

    concatName(fullMiddleName=true) {
        return `${this.firstName} ${fullMiddleName ? this.middleName : this.middleName[0] + '.'} ${this.lastName}`;
    }

    nameUser() {
        const names = {
            first: [
                'Amber', 'Blue', 'Coral', 'Dunn', 
                'Ebony', 'Frost', 'Garnet', 'Heather', 
                'Indigo', 'Jade', 'Khaki', 'Lazuli', 
                'Mocha', 'Navy', 'Onyx', 'Primrose', 
                'Quince', 'Russet', 'Sable', 'Topaz', 
                'Umber', 'Violet', 'Walnut', 'Xanthic', 
                'Yellow', 'Zaffre'
            ],
            last: [
                'Agastache', 'Basswood', 'Calendula', 'Daphne', 
                'Edelweiss', 'Flax', 'Gerber', 'Hawthorn', 
                'Iris', 'Jewelweed', 'Kohlrabi', 'Larch', 
                'Mahonia', 'Nutmeg', 'Okra', 'Patchouli', 
                'Quinoa', 'Ramps', 'Sassafras', 'Taro', 
                'Ursinia', 'Verbena', 'Wisteria', 'Xyris', 
                'Yarrow', 'Zamia'
            ]
        };

        let totalNames = names.first.length;
        let [f, m, l] = ['first', 'middle', 'last'].map( name => getRandomNum(totalNames));
        while (f === m) {
            f = getRandomNum(names.first.length);
        }

        return [
            names.first[f],
            names.first[m],
            names.last[l]
        ];
    }
}