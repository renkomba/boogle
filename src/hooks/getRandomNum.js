// Impossible to get max value
export const getRandomNum = (max=10, min=0) => {
    return Math.floor( Math.random() * (max-min) + min );
}