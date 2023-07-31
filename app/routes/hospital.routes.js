/* 
    Route: /api/hospitals
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields.middleware');
const { validateJwt } = require('../middlewares/validate-jwt.middleware');
const { getHospitals, addHospital, editHospital, deleteHospital } = require('../controllers/hospital.controller');

const router = Router();

// hospitals list
router.get(
    '/', 
    [
        validateJwt,
    ],
    getHospitals
);

// create hospital
router.post(
    '/', 
    [
        validateJwt,
        check('name', 'The name field is required.').not().isEmpty(),
        validateFields,
    ], 
    addHospital
);

// edit hospital
router.put(
    '/:id', 
    [
        validateJwt,
        check('name', 'The name field is required.').not().isEmpty(),
        validateFields,
    ],
    editHospital
);

// delete hospital
router.delete(
    '/:id',
    [
        validateJwt,
    ],
    deleteHospital
);

module.exports = router;