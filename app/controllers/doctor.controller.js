const { response } = require('express');

const Doctor = require('../models/doctor.model');
const { getJwt } = require('../helpers/jwt.helper');

/* 
    Get doctors list
*/
const getDoctors = async(req, res = response) => {
    const doctors = await Doctor.find()
        .populate('user', 'name email image')
        .populate('hospital', 'name image');

    res.json({ doctors })
}

/* 
    Create doctor in db
*/
const addDoctor = async(req, res = response) => {
    try {
        const doctor = new Doctor({
            user: req.id,
            ...req.body
        });

        await doctor.save();

        res.json({
            msg: 'Doctor created!',
            doctor,
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

/* 
    Update Doctor in db
*/
const editDoctor = async(req, res = response) => {
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
    Delete Doctor in db
*/
const deleteDoctor = async(req, res = response) => {
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
    getDoctors,
    addDoctor,
    editDoctor,
    deleteDoctor,
};