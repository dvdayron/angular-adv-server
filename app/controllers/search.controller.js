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
        const page = Number(req.query.page) || process.env.PAGINATION_DEFAULT_PAGE;
        const limit = Number(req.query.limit) || process.env.PAGINATION_DEFAULT_LIMIT;
        const index = limit * page;

        let data = [];
        let count = 0;

        switch (collection) {
            case 'user': 
                const [users, usersCount] = await Promise.all([
                    User.find({ name: regexp }).skip(index).limit(limit),
                    User.find({ name: regexp }).count()
                ]);
                data = users;
                count = usersCount;
                break;
            case 'doctor': 
                const [doctors, doctorsCount] = await Promise.all([
                    Doctor.find({ name: regexp })
                        .populate('user', 'name email image')
                        .populate('hospital', 'name image')
                        .skip(index)
                        .limit(limit),
                    Doctor.find({ name: regexp }).count()
                ]);
                data = doctors;
                count = doctorsCount;
                break;
            case 'hospital': 
                const [hospitals, hospitalsCount] = await Promise.all([
                    Hospital.find({ name: regexp })
                        .populate('user', 'name email image')
                        .skip(index).
                        limit(limit),
                    Hospital.find({ name: regexp }).count()
                ]);
                data = hospitals;
                count = hospitalsCount;
                break;
            default: 
                return res.status(500).json({
                    error: 'Invalid collection.'
                });
        }

        let maxPageCount = parseInt(count / limit);
        maxPageCount += count % limit === 0 ? 0 : 1;

        res.json({
            collection,
            term,
            data,
            pagination: {
                count, 
                page: parseInt(page.toString()),
                limit: parseInt(limit), 
                index,
                maxPageCount,
            }
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