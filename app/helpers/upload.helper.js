/* 
    Extract file extension from name
*/
const { uploadPath } = require('../constants/uploads.constants');

const getFileExtension = (name) => {
    if (!name) {
        return null;
    }

    const nameSplitted = name.split('.');
    
    if (!nameSplitted.length) {
        return null;
    }

    return nameSplitted[nameSplitted.length - 1];
};

const getFilePath = (collection, fileName) => {
    return `${uploadPath}/${collection}/${fileName}`;
}

module.exports = {
    getFileExtension,
    getFilePath,
};