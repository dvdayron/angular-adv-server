const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const { getJwt } = require('../helpers/jwt.helper');

/* 
    Log in action
*/
const logIn = async(req, res = response) => {
    try {
        const { email, password } = req.body;

        // verify email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                error: 'Email or password invalid.'
            });
        }

        // verify password
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                error: 'Email or password invalid.'
            });
        }

        const token = await getJwt(user.id)

        res.json({
            msg: 'User logged!',
            token
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

module.exports = {
    logIn,
};