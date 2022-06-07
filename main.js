const replicateNode = (node, times=1) => {
    // debugger;
    if (times < 1) return;
    let collection = [];

    while (collection.length < times) {
        collection.push(node.cloneNode(true));
    }

    return collection;
}

const profPics = {
    fem: {
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
    masc: {
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

const getProfPicAttributes = isFem => {
    let gender = isFem ? 'fem' : 'masc';
    let urls = Object.values( profPics[gender] );
    let i = Math.floor( Math.random() * urls.length );
    let alt = isFem ? 'female avatar' : 'male avatar';
    return [ urls[i] , alt ];
}

const students = {
    Mia: {
        nickname: 'shoes',
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
        nickname: 'Bold',
        team: 'Branding',
        isFem: true
    },
    Albert: {
        nickname: 'Nemesis',
        team: 'Branding',
        isFem: false
    },
    Alexandra: {
        nickname: 'Wheels',
        team: 'Wording',
        isFem: true
    },
    Naomi: {
        nickname: 'Brains',
        team: 'Wording',
        isFem: true
    },
    Fetra: {
        nickname: 'Vibes',
        team: 'Wording',
        isFem: false
    },
    Liem: {
        nickname: 'Secretary',
        team: 'Branding',
        isFem: false
    },
    Kaily: {
        nickname: 'Style',
        team: 'Wording',
        isFem: true
    }
};

const addProfPic = students => {
    // debugger;
    for (let student in students) {
        student = students[student];
        [ student.profPicSrc, student.profPicAlt ] = getProfPicAttributes(student.isFem);
    } 
}

addProfPic(students);

const getTeamMembers = team => {
    let members = [];

    for (let student in students) {
        student = students[student];
        // console.log( ({nickname, profPic}) => ({nickname, profPic})(student) );
        if (student.team === team) members.push(student);
    }
    // console.log(`${team}: ${members.length} members (${members})`);
    return members;
}

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

let teamNames = Object.keys(teams);
const allTeams = document.querySelector('#teams');
const teamPrime = document.querySelector('.team');
const memberPrime = document.querySelector('.member');


const fillTeams = teamNames => {
    let teamArticles = [];
    
    for (let teamName of teamNames) {
        let teamArticle = teamPrime.cloneNode(true);
        teamArticle.querySelector('h3').innerHTML = teamName;
        teamArticle.querySelector('p').innerHTML = teams[teamName].description;
        labelMembers(teamArticle, teams[teamName].members);
        teamArticles.push(teamArticle);
    }
    debugger;

    allTeams.append( ...teamArticles );
}

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

fillTeams(teamNames);

console.log(teams.Branding.members);

// EdTech Logos
const edtech = {
    blooket: {
        idFigure: 'this-is-language',
        src: '',
        idImg: 'this-is-language-img'
    },
}