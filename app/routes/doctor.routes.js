/* 
    Route: /api/doctors
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields.middleware');
const { validateJwt } = require('../middlewares/validate-jwt.middleware');
const { getDoctors, addDoctor, editDoctor, deleteDoctor } = require('../controllers/doctor.controller');

const router = Router();

// doctors list
router.get(
    '/', 
    [
        validateJwt,
    ],
    getDoctors
);

// create doctor
router.post(
    '/', 
    [
        validateJwt,
        check('name', 'The name field is required.').not().isEmpty(),
        check('hospital', 'The hospital is field is required.').isMongoId(),
        validateFields,
    ], 
    addDoctor
);

// edit doctor
router.put(
    '/:id', 
    [
        validateJwt,
        check('name', 'The name field is required.').not().isEmpty(),
        check('hospital', 'The hospital is field is required.').isMongoId(),
        validateFields,
    ],
    editDoctor
);

// delete doctor
router.delete(
    '/:id',
    [
        validateJwt,
    ],
    deleteDoctor
);

module.exports = router;