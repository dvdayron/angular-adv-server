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

// reading body parameters
app.use(express.json());

// db connection
dbConnection();

// app routes
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

// server initialized
app.listen(process.env.APP_PORT, () => console.log('Server running on port: ' + process.env.APP_PORT));