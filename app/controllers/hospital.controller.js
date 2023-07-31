const { response } = require('express');

const Hospital = require('../models/hospital.model');

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

        const existsHospital = await Hospital.findById(id);

        if (!existsHospital) {
            return res.status(400).json({
                error: 'This hospital does not exist.'
            });
        }

        const hospital = await Hospital.findByIdAndUpdate(id, req.body, { new: true });

        res.json({
            msg: 'Hospital updated!',
            hospital
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

        const existsHospital = await Hospital.findById(id);

        if (!existsHospital) {
            return res.status(400).json({
                error: 'This hospital with id ' + id + ' does not exist.'
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            msg: 'Hospital deleted!',
        });
    } catch (error) {
        console.log(error);
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