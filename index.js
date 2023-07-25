// enviroment vars
require('dotenv').config();

// express required
const express = require('express');

// cors required
const cors = require('cors');

// db connection required
const { dbConnection } = require('./database/config');

// create server
const app = express();

// config cors
app.use(cors());

// db connection
dbConnection();

app.get('/', (req, res) => {
    res.status(200).json({
        ok: true, message: 'hola mundo'
    });
});

app.listen(process.env.APP_PORT, () => console.log('Server running'));