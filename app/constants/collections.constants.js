const collectionType = {
    doctor: 'doctor',
    hospital: 'hospital',
    user: 'user',
};

const validCollections = [
    collectionType.user, 
    collectionType.doctor, 
    collectionType.hospital,
];

module.exports = {
    collectionType,
    validCollections,
}