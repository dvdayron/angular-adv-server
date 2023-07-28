/* 
    Route: /api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields.middleware');
const { validateJwt } = require('../middlewares/validate-jwt.middleware');
const { getUsers, addUser, editUser, deleteUser } = require('../controllers/user.controller');

const router = Router();

// users list
router.get(
    '/', 
    [
        validateJwt
    ],
    getUsers
);

// create user
router.post(
    '/', 
    [
        validateJwt,
        check('name', 'The name field is required.').not().isEmpty(),
        check('password', 'The password field is required.').not().isEmpty(),
        check('email', 'The email field is required and must be a valid email.').isEmail(),
        validateFields,
    ], 
    addUser
);

// edit user
router.put(
    '/:id', 
    [
        validateJwt,
        check('password', 'The password field is required.').not().isEmpty(),
        check('email', 'The email field is required and must be a valid email.').isEmail(),
        check('role', 'The role field is required.').not().isEmpty(),
        validateFields,
    ],
    editUser
);

// delete user
router.delete(
    '/:id',
    [
        validateJwt
    ],
    deleteUser
);

module.exports = router;