const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields.middleware');
const { logIn } = require('../controllers/auth.controller');

const router = Router();

// users list
router.post(
    '/login', 
    [
        check('email', 'The email field is required and must be a valid email.').isEmail(),
        check('password', 'The password field is required.').not().isEmpty(),
        validateFields,
    ],
    logIn
);

module.exports = router;