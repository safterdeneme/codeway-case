const convertTimestampToMilisecond = (timestamp) => {
    return timestamp._seconds * 1000 + Math.floor(timestamp._nanoseconds / 1000000);
}

const convertTimestampToDate = (timestamp) => {
    return new Date(convertTimestampToMilisecond(timestamp));
}

const convertTimestampToReadableDate = (timestamp) => {
    return convertTimestampToDate(timestamp).toLocaleString();
}

module.exports = {
    convertTimestampToDate,
    convertTimestampToMilisecond,
    convertTimestampToReadableDate
}