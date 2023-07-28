const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const { getJwt } = require('../helpers/jwt.helper');

/* 
    Get users list
*/
const getUsers = async(req, res = response) => {
    const page = Number(req.query.page) || process.env.PAGINATION_DEFAULT_PAGE;
    const limit = Number(req.query.limit) || process.env.PAGINATION_DEFAULT_LIMIT;
    const index = limit * page;

    const [users, count] = await Promise.all([
        User.find().skip(index).limit(limit),
        User.count()
    ]);

    res.json({ 
        users,
        pagination: {
            count, 
            page, 
            limit, 
            index,
        }
     })
}

/* 
    Create user in db
*/
const addUser = async(req, res = response) => {
    try {
        const { email, password } = req.body;

        const existsEmail = await User.findOne({ email });

        if (existsEmail) {
            return res.status(400).json({
                error: 'There is already a user with this email: ' + email
            });
        }

        const user = new User(req.body);

        // encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await getJwt(user.id);

        res.json({
            msg: 'User created!',
            user,
            token
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

/* 
    Update user in db
*/
const editUser = async(req, res = response) => {
    try {
        const id = req.params.id;

        const existsUser = await User.findById(id);

        if (!existsUser) {
            return res.status(400).json({
                error: 'This user does not exist.'
            });
        }

        const { password, googleAuth, email, ...fields } = req.body;

        if (existsUser.email != email) {
            const existsEmail = await User.findOne({ email });

            if (existsEmail) {
                return res.status(400).json({
                    error: 'There is already a user with this email: ' + fields.email
                });
            }
        }

        fields.email = email;

        const user = await User.findByIdAndUpdate(id, fields, { new: true });

        res.json({
            msg: 'User updated!',
            user
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

/* 
    Delete user in db
*/
const deleteUser = async(req, res = response) => {
    try {
        const id = req.params.id;

        const existsUser = await User.findById(id);

        if (!existsUser) {
            return res.status(400).json({
                error: 'This user with id ' + id + ' does not exist.'
            });
        }

        await User.findByIdAndDelete(id);

        res.json({
            msg: 'User deleted!',
            existsUser
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

module.exports = {
    getUsers,
    addUser,
    editUser,
    deleteUser,
};