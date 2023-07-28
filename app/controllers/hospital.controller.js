const { response } = require('express');

const Hospital = require('../models/hospital.model');
const { getJwt } = require('../helpers/jwt.helper');

/* 
    Get hospitals list
*/
const getHospitals = async(req, res = response) => {
    const hospitals = await Hospital.find()
        .populate('user', 'name email image');

    res.json({ hospitals })
}

/* 
    Create hospital in db
*/
const addHospital = async(req, res = response) => {
    try {
        const hospital = new Hospital({
            user: req.id,
            ...req.body
        });

        await hospital.save();

        res.json({
            msg: 'Hospital created!',
            hospital,
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

/* 
    Update hospital in db
*/
const editHospital = async(req, res = response) => {
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
    Delete hospital in db
*/
const deleteHospital = async(req, res = response) => {
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
    getHospitals,
    addHospital,
    editHospital,
    deleteHospital,
};