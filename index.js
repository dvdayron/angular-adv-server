// enviroment vars
require('dotenv').config();

// express required
const express = require('express');

// cors required
const cors = require('cors');

// db connection required
const { dbConnection } = require('./app/config/database');

// create server
const app = express();

// config cors
app.use(cors());

// public folder
app.use(express.static('./app/public'));

// reading body parameters
app.use(express.json());

// db connection
dbConnection();

// app routes
app.use('/api/auth', require('./app/routes/auth.routes'));
app.use('/api/search', require('./app/routes/search.routes'));
app.use('/api/uploads', require('./app/routes/uploads.routes'));
app.use('/api/users', require('./app/routes/user.routes'));
app.use('/api/hospitals', require('./app/routes/hospital.routes'));
app.use('/api/doctors', require('./app/routes/doctor.routes'));

// server initialized
app.listen(process.env.APP_PORT, () => console.log('Server running on port: ' + process.env.APP_PORT));