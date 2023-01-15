const uuid = require('uuid');

const generateUuid1 = () => {
    return uuid.v1();
}

const generateUuid4 = () => {
    return uuid.v4();
}

const generateMultipleUuid4 = (amount) => {
    let uuids = "";
    for (let i = 0; i < amount; i++) {
        uuids += uuid.v4() + "\n";
    }
    return uuids;
}

module.exports = { generateUuid1, generateUuid4, generateMultipleUuid4 }
