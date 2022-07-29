export const getOrdinalSuffix = (num=1) => {
    num %= 10;

    return num > 3 ? 'th'
        : num === 3 ? 'rd'
        : num === 2 ? 'nd'
        : 'st'
}