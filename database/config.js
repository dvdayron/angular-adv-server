const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('Db connected!!');
    } catch (error) {
        console.error(error);
        throw new Error('Db connection failed!');
    }
}

module.exports = {
    dbConnection
};