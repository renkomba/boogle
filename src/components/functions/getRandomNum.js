// Impossible to get max value
const getRandomNum = (max=10, min=0) => {
    return Math.floor( Math.random() * (max-min) + min );
}

export default getRandomNum;