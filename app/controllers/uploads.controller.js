const { response } = require("express");

const { uploadImage } = require('../services/uploads.service');

const fileUpload = (req, res = response) => {
    try {
        uploadImage(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

const getFile = (req, res = response) => {
    const { getUploadFile } = require('../services/uploads.service');

    try {
        getUploadFile(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

module.exports = {
    fileUpload,
    getFile,
};