const flatten2dArray = (array2d=[], array1d=[]) => {
    for (let subArray of array2d) {
        for (let element of subArray) {
            array1d.push(element);
        }
    }
    return array1d;
}

export default flatten2dArray;