// --------------------------
// Configuration
// --------------------------
const port = 3002;
const ROOTPATH = process.cwd();
global.ROOTPATH = ROOTPATH;

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
const appconf = require('./libs/config')();

// --------------------------
// Globals
// --------------------------
global.appconfig = appconf.config;
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
api.listen(port, () => {
    console.log(`Flashcards API is listening on port ${port}`);
});