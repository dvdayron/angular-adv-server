/*
    JWT common functions
*/

const jwt = require('jsonwebtoken');

const getJwt = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id: userId,
        }
    
        jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                reject('Error generating token');
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    getJwt,
}