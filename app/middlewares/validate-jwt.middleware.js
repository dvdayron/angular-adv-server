/* 
    Validate jwt for requests
*/

const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJwt = (req, res = response, next) => {
    // read auth-token from header
    const token = req.header('auth-token');

    if (!token) {
        return res.status(400).json({
            error: 'Invalid auth token.'
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.id = id;
        
        next();
    } catch (error) {
        return res.status(400).json({
            error
        });
    }
};

module.exports = {
    validateJwt
};