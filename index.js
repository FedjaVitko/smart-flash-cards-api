// --------------------------
// Configuration
// --------------------------
const port = 4000;
const ROOTPATH = process.cwd();
global.ROOTPATH = ROOTPATH;

// --------------------------
// External Imports
// --------------------------
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
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
const app = express();

// --------------------------
// Middleware
// --------------------------
app.use(bodyParser.json());

// --------------------------
// Controllers
// --------------------------
app.use('/cards', ctrl.cardsController);

// --------------------------
// Server 
// --------------------------
app.listen(port, () => {
    console.log(`Flashcards API is listening on port ${port}`);
});