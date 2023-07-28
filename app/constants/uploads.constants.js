const { collectionType } = require('./collections.constants');
const uploadPath = process.env.UPLOADS_DIRECTORY;
const noImagePath = `${uploadPath}/no-img.jpg`;

const fileExtensions = {
    png: 'png',
    jpg: 'jpg',
    jpeg: 'jpeg',
    webp: 'webp',
}

const validFileExtensions = [
    fileExtensions.png,
    fileExtensions.jpeg,
    fileExtensions.jpg,
    fileExtensions.webp,
]

module.exports = {
    uploadPath,
    noImagePath,
    validFileExtensions,
}