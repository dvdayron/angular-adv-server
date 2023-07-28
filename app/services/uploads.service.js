/* 
    Upload images to /uploads/collection/fileName
*/
const uploadImage = async(req, res) => {
    const { v4: uuidv4 } = require('uuid');
    const { validCollections } = require('../constants/collections.constants');
    const { validFileExtensions } = require('../constants/uploads.constants');
    const { getFileExtension, getFilePath } = require('../helpers/upload.helper');

    const collection = req.params.collection;
    const documentId = req.params.documentId;

    if (!validCollections.includes(collection)) {
        res.status(400).json({
            error: 'Invalid collection.'
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            error: 'No files were uploaded.'
        });
    }

    const file = req.files.image;
    const ext = getFileExtension(file.name);

    if (!ext || !validFileExtensions.includes(ext)) {
        return res.status(400).json({
            error: 'Invalid file extension.'
        });
    }

    const fileName = `${uuidv4()}.${ext}`;
    const filePath = getFilePath(collection, fileName);

    file.mv(filePath, function(error) {
        if (error) {
            console.log(error);
            return res.status(500).json(
                error
            );
        }

        if (!updateImage(collection, documentId, fileName)) {
            return res.status(500).json({
                error: 'Error updating image.'
            });
        }
        
        res.json({
            msg: 'File uploaded.',
            filePath,
        });
    });
};

const updateImage = async(collection, documentId, fileName) => {
    const fs = require('fs');
    const { getFilePath } = require('../helpers/upload.helper');
    const { getCollectionInstance } = require('../helpers/collection.helper');

    try {
        const instance = await getCollectionInstance(collection, documentId);

        if (!instance) {
            return false;
        }

        const oldFilePath = getFilePath(collection, instance.image);
                
        if (fs.existsSync(oldFilePath)) {
            fs.unlink(oldFilePath, () => {
                // do it anything
            });
        }

        instance.image = fileName;

        await instance.save();

        return true;
    } catch (error) {
        console.log(error);

        return false;
    }
};

/* 
    View files
*/
const getUploadFile = (req, res) => {
    const fs = require('fs');
    const path = require('path');
    const { getFilePath } = require('../helpers/upload.helper');
    const { noImagePath } = require('../constants/uploads.constants');

    const collection = req.params.collection;
    const fileName = req.params.file;

    const filePath = path.join( __dirname, `../.${getFilePath(collection, fileName)}`);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        const noImageFilePath = path.join( __dirname, `../.${noImagePath}`);
        res.sendFile(noImageFilePath);
    }
};

module.exports = {
    uploadImage,
    getUploadFile,
}