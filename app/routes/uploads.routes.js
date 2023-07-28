/* 
    Route: /api/uploads
*/

const { Router } = require('express');
const expressfileUpload = require('express-fileupload');

const { validateJwt } = require('../middlewares/validate-jwt.middleware');
const { fileUpload, getFile } = require('../controllers/uploads.controller');

const router = Router();

// uploads middleware
router.use(expressfileUpload());

// upload files on collection documents
router.put(
    '/:collection/:documentId', 
    [
        validateJwt,
    ],
    fileUpload
);

// get files
router.get(
    '/:collection/:file', 
    getFile
);

module.exports = router;