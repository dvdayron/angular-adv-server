const { response } = require('express');

const Doctor = require('../models/doctor.model');

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

        const existsDoctor = await Doctor.findById(id);

        if (!existsDoctor) {
            return res.status(400).json({
                error: 'This doctor does not exist.'
            });
        }

        const doctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true });

        res.json({
            msg: 'Doctor updated!',
            doctor
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

        const existsDoctor = await Doctor.findById(id);

        if (!existsDoctor) {
            return res.status(400).json({
                error: 'This doctor with id ' + id + ' does not exist.'
            });
        }

        await Doctor.findByIdAndDelete(id);

        res.json({
            msg: 'Doctor deleted!',
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