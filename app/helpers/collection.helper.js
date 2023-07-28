const getCollectionInstance = async(collection, documentId) => {
    const { collectionType, validCollections } = require('../constants/collections.constants');
    const Doctor = require('../models/doctor.model');
    const Hospital = require('../models/hospital.model');
    const User = require('../models/user.model');

    if (!validCollections.includes(collection)) {
        return null;
    }

    switch (collection) {
        case collectionType.user: {
            return await User.findById(documentId);
        }
        case collectionType.doctor: {
            return await Doctor.findById(documentId);
        }
        case collectionType.hospital: {
            return await Hospital.findById(documentId);
        }
        default: {
            return null;
        }
    }
}

module.exports = {
    getCollectionInstance,
}