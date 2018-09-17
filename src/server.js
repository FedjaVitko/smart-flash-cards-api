// --------------------------
// Globals
// --------------------------
global.ROOTPATH = process.cwd();

// --------------------------
// External Imports
// --------------------------
const path = require('path');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const autoload = require('auto-load');

// --------------------------
// Internal Imports
// --------------------------
const config =  require('./config');
const setupExpressErrorHandler = require('./utils/errors').setupExpressErrorHandler;

// --------------------------
// Configuration
// --------------------------
const { server: { port: PORT }, env: ENV } = config;

// --------------------------
// Express app
// --------------------------
const api = express();

// --------------------------
// Middleware
// --------------------------
api.use(bodyParser.json());
api.use(cors());

// --------------------------
// Routes
// --------------------------
fs.readdirSync(path.join(__dirname, 'routes')).forEach(file => {
    if (file.endsWith('.js')) {
        require('./routes/' + file)(api);
    }
})

// --------------------------
// Server 
// --------------------------
require('./utils/db');

api.listen(PORT, err => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.info(`API is now running on port ${PORT} in ${ENV} mode`);
});

setupExpressErrorHandler(api);

module.exports = api;