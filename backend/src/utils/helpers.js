const convertTimestampToMilisecond = (timestamp) => {
    return timestamp._seconds * 1000 + Math.floor(timestamp._nanoseconds / 1000000)
}


const compareTimestamps = (timestampA, timestampB) => {
    const msA = convertTimestampToMilisecond(timestampA);
    const msB = convertTimestampToMilisecond(timestampB);

    return msA === msB
}
module.exports = {
    convertTimestampToMilisecond,
    compareTimestamps
}