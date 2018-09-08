// --------------------------
// Configuration
// --------------------------
global.ROOTPATH = process.cwd();

// --------------------------
// External Imports
// --------------------------
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const autoload = require('auto-load');

const ctrl = autoload(path.join(ROOTPATH, '/controllers'));

// --------------------------
// Internal Imports
// --------------------------
const conf = require('./libs/config')();

// --------------------------
// Globals
// --------------------------
global.config = conf.config;
global.db = require('./libs/db').init();

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
fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
    require('./routes/' + file)(api);
})

// --------------------------
// Server 
// --------------------------
api.listen(config.server.port, err => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.info(`API is now running on port ${config.server.port} in ${config.env} mode`);
});