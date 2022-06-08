// PRIMARY OBJECT FUNCTIONS
// repeated code looping through students obj. Should it be global?

const getTeamMembers = team => {
    let members = [];

    for (let student in students) {
        student = students[student];
        if (student.team === team) members.push(student);
    }

    return members;
}

const addProfPic = students => {
    // debugger;
    for (let student in students) {
        student = students[student];
        [ student.profPicSrc, student.profPicAlt ] = getProfPicAttributes(student.isFem);
    } 
}

const getProfPicAttributes = isFem => {
    let [ alt, urlKey, urlValue ] = [
        isFem ? 'female avatar' : 'male avatar',
        '', ''
    ];

    let urls = Object.entries( profPics[alt] );
    [ urlKey, urlValue ] = urls[ getI(urls) ];

    delete profPics[alt][urlKey];
    return [ urlValue , alt ];
}

const getI = arr => {
    return Math.floor( Math.random() * arr.length );
} 

// PRIMARY OBJECTS
const students = {
    Mia: {
        nickname: 'Shoes',
        team: 'Branding',
        isFem: true
    },
    Liam: {
        nickname: 'Polar Express',
        team: 'Branding',
        isFem: false
    },
    Hazel: {
        nickname: 'Picasso',
        team: 'Branding',
        isFem: true
    },
    Maggie: {
        nickname: 'Swan',
        team: 'Managing',
        isFem: true
    },
    Dwight: {
        nickname: 'Schrute',
        team: 'Marketing',
        isFem: false
    },
    Ben: {
        nickname: 'Linguini',
        team: 'Wording',
        isFem: false
    },
    Zack: {
        nickname: 'Smile',
        team: 'Branding',
        isFem: false
    },
    Timberly: {
        nickname: 'Brains',
        team: 'Engineering',
        isFem: true
    },
    Rossmary: {
        nickname: 'Boss',
        team: 'Managing',
        isFem: true
    },
    Julie: {
        nickname: 'Camel',
        team: 'Branding',
        isFem: true
    },
    Albert: {
        nickname: 'Nemesis',
        team: 'Branding',
        isFem: false
    },
    Alexandra: {
        nickname: 'Flowers',
        team: 'Wording',
        isFem: true
    },
    Naomi: {
        nickname: 'Icon',
        team: 'Wording',
        isFem: true
    },
    Fetra: {
        nickname: 'Vibes',
        team: 'Wording',
        isFem: false
    },
    Liem: {
        nickname: 'Junior',
        team: 'Branding',
        isFem: false
    },
    Kaily: {
        nickname: 'Fashion',
        team: 'Wording',
        isFem: true
    }
};

const profPics = {
    'female avatar': {
      longPony: 'https://us.123rf.com/450wm/apoev/apoev2107/apoev210700055/171659484-stock-vector-default-avatar-photo-placeholder-gray-profile-picture-icon-woman-in-t-shirt.jpg?ver=6',
      longBraid: 'https://st4.depositphotos.com/9998432/23754/v/600/depositphotos_237542156-stock-illustration-person-gray-photo-placeholder-woman.jpg',
      shortThick: 'https://us.123rf.com/450wm/apoev/apoev2107/apoev210700056/171659863-stock-vector-default-avatar-photo-placeholder-gray-profile-picture-icon-woman-in-t-shirt.jpg?ver=6',
      updo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo5xvMa780IOgGrq8AWIexThOG3RQhIR4IDlVdWFDbxC3F5jt-',
      longDown: 'https://jtphealth.com/wp-content/uploads/2021/06/profile-placeholder-female-3.png',
      longDownLeft: 'https://us.123rf.com/450wm/apoev/apoev2107/apoev210700058/171681534-stock-vector-default-avatar-photo-placeholder-gray-profile-picture-icon-woman-in-t-shirt.jpg?ver=6',
      longDownRight: 'https://us.123rf.com/450wm/apoev/apoev2107/apoev210700047/171681530-stock-vector-default-avatar-photo-placeholder-gray-profile-picture-icon-woman-in-t-shirt.jpg?ver=6',
      longDownLeftRight: 'https://us.123rf.com/450wm/apoev/apoev2107/apoev210700060/171660244-stock-vector-default-avatar-photo-placeholder-gray-profile-picture-icon-woman-in-t-shirt.jpg?ver=6',
      shortBobUneven: 'https://us.123rf.com/450wm/apoev/apoev2107/apoev210700063/171681536-stock-vector-default-avatar-photo-placeholder-gray-profile-picture-icon-woman-in-t-shirt.jpg?ver=6',
      shortWavy: 'https://us.123rf.com/450wm/apoev/apoev2107/apoev210700061/171658815-stock-vector-default-avatar-photo-placeholder-gray-profile-picture-icon-woman-in-t-shirt.jpg?ver=6',
      shortBobEven: 'https://us.123rf.com/450wm/apoev/apoev2107/apoev210700050/171681531-stock-vector-default-avatar-photo-placeholder-gray-profile-picture-icon-woman-in-t-shirt.jpg?ver=6'
    },
    'male avatar': {
      noBangsBeard: 'https://us.123rf.com/450wm/apoev/apoev2107/apoev210700053/171681533-stock-vector-default-avatar-photo-placeholder-gray-profile-picture-icon-man-in-t-shirt.jpg?ver=6',
      noBangsNoBeard: 'https://us.123rf.com/450wm/apoev/apoev2107/apoev210700046/171681529-stock-vector-default-avatar-photo-placeholder-gray-profile-picture-icon-man-in-t-shirt.jpg?ver=6',
      noBangsNoBeardFlyaways: 'https://us.123rf.com/450wm/apoev/apoev2107/apoev210700059/171660361-stock-vector-default-avatar-photo-placeholder-gray-profile-picture-icon-man-in-t-shirt.jpg?ver=6',
      bangsNoBeardVolume: 'https://us.123rf.com/450wm/apoev/apoev2107/apoev210700045/171681528-stock-vector-default-avatar-photo-placeholder-gray-profile-picture-icon-man-in-t-shirt.jpg?ver=6',
      bangsNoBeard: 'https://us.123rf.com/450wm/apoev/apoev2107/apoev210700057/171660082-stock-vector-default-avatar-photo-placeholder-gray-profile-picture-icon-man-in-t-shirt.jpg?ver=6',
      thickBeard: 'https://us.123rf.com/450wm/apoev/apoev2107/apoev210700048/171659491-stock-vector-default-avatar-photo-placeholder-gray-profile-picture-icon-man-in-t-shirt.jpg?ver=6',
      noBangsNoBeardGlasses: 'https://us.123rf.com/450wm/apoev/apoev2107/apoev210700054/171659444-stock-vector-default-avatar-photo-placeholder-gray-profile-picture-icon-man-in-t-shirt.jpg?ver=6',
      noBangsBeardGlasses: 'https://us.123rf.com/450wm/apoev/apoev2107/apoev210700051/171659364-stock-vector-default-avatar-photo-placeholder-gray-profile-picture-icon-man-in-t-shirt.jpg?ver=6',
      reverseBangsNoBeard: 'https://us.123rf.com/450wm/apoev/apoev2107/apoev210700049/171659475-stock-vector-default-avatar-photo-placeholder-gray-profile-picture-icon-man-in-t-shirt.jpg?ver=6'
    }
};

const teams = {
    Branding: {
        description: 'We made the images/logo and chose the fonts, layout, and colours.',
        members: getTeamMembers('Branding')
    },
    Wording: {
        description: 'We scripted, translated, and recorded the video as well as the words on the site.',
        members: getTeamMembers('Wording')
    },
    Managing: {
        description: 'We organised chaos and gave Madame homework.',
        members: getTeamMembers('Managing')
    },
    Marketing: {
        description: 'We came up with a marketing approach and the teachers we wanted to market to.',
        members: getTeamMembers('Marketing')
    },
    Engineering: {
        description: 'We wireframed, designed, and built the site.',
        members: getTeamMembers('Engineering')
    }
};

// GLOBAL VARIABLES
const allTeams = document.querySelector('#teams');
const teamPrime = document.querySelector('.team');
const memberPrime = document.querySelector('.member');

// ANCILLARY FUNCTIONS
const labelMembers = (node, teamMembers) => {
    // debugger;
    let membersNode = node.querySelector('.members');
    membersNode.append( ...replicateNode(
        memberPrime.cloneNode(true),
        teamMembers.length - 1
    ) );

    for (let i = 0; i < teamMembers.length; i++) {
        let memberNode = membersNode.children[i];
        if (memberNode.nodeName === '#text') continue;

        let {profPicSrc, profPicAlt, nickname} = teamMembers[i];
        memberNode.querySelector('img').src = profPicSrc;
        memberNode.querySelector('img').alt = profPicAlt;
        memberNode.querySelector('.member-alias').innerHTML = nickname;
    };
}

const replicateNode = (node, times=1) => {
    // debugger;
    if (times < 1) return [];
    let collection = [];

    while (collection.length < times) {
        collection.push(node.cloneNode(true));
    }

    return collection;
}

// MAIN FUNCTION
const fillTeams = () => {
    let [ teamNames, teamArticles ] = [
        Object.keys(teams),
        []
    ];
    // debugger;
    
    for (let teamName of teamNames) {
        let teamArticle = teamPrime.cloneNode(true);
        teamArticle.querySelector('h3').innerHTML = teamName;
        teamArticle.querySelector('p').innerHTML = teams[teamName].description;
        labelMembers(teamArticle, teams[teamName].members);
        teamArticles.push(teamArticle);
    }

    allTeams.append( ...teamArticles );
}


// PROGRAM EXECUTIONS
addProfPic(students);
fillTeams();

// EdTech Logos
const edtech = {
    blooket: {
        idFigure: 'this-is-language',
        src: '',
        idImg: 'this-is-language-img'
    },
}