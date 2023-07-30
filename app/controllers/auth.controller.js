const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const { getJwt } = require('../helpers/jwt.helper');
const { googleVerify } = require('../helpers/google-auth.helper');

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

        const jwtToken = await getJwt(user.id)

        res.json({
            msg: 'User logged!',
            token: jwtToken
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

/* 
    Log in action
*/
const googleSignIn = async(req, res = response) => {
    try {
        const { token } = req.body;

        const { email, name, picture } = await googleVerify(token);

        const userDb = await User.findOne({ email });

        let user;

        if (!userDb) {
            user = new User({
                name, 
                email, 
                password: 'no password',
                image: picture,
                googleAuth: true,

            });
        } else {
            user = userDb;
            user.googleAuth = true;
        }

        await user.save();

        const jwtToken = await getJwt(user.id)

        res.json({
            msg: 'Google login',
            token: jwtToken,
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

module.exports = {
    logIn,
    googleSignIn,
};