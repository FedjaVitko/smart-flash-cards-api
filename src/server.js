// --------------------------
// Configuration
// --------------------------
global.ROOTPATH = process.cwd();

// --------------------------
// External Imports
// --------------------------
const path = require('path');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const autoload = require('auto-load');

const ctrl = autoload(path.join(ROOTPATH, '/controllers'));

// --------------------------
// Internal Imports
// --------------------------
const config =  require('./config');

// --------------------------
// Express app
// --------------------------
const api = express();

// --------------------------
// Middleware
// --------------------------
api.use(bodyParser.json());

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

api.listen(config.server.port, err => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.info(`API is now running on port ${config.server.port} in ${config.env} mode`);
});