const { response } = require("express");

const User = require('../models/user.model');
const Doctor = require('../models/doctor.model');
const Hospital = require('../models/hospital.model');

const getSearchResults = async(req, res = response) => {
    try {
        const term = req.params.term;
        const regexp = new RegExp(term, 'i');

        const [users, doctors, hospitals] = await Promise.all([
            User.find({ name: regexp }),
            Doctor.find({ name: regexp }),
            Hospital.find({ name: regexp }),
        ])

        res.json({
            term,
            users,
            doctors,
            hospitals
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
};

const getSearchResultsByCollection = async(req, res = response) => {
    try {
        const collection = req.params.collection;
        const term = req.params.term;
        const regexp = new RegExp(term, 'i');

        let data = [];

        switch (collection) {
            case 'user': 
                data = await User.find({ name: regexp });
                break;
            case 'doctor': 
                data = await Doctor.find({ name: regexp })
                    .populate('user', 'name email image')
                    .populate('hospital', 'name image');
                break;
            case 'hospital': 
                data = await Hospital.find({ name: regexp })
                    .populate('user', 'name email image');
                break;
            default: 
                return res.status(500).json({
                    error: 'Invalid collection.'
                });
        }

        res.json({
            collection,
            term,
            data,
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
};

module.exports = {
    getSearchResults,
    getSearchResultsByCollection
}