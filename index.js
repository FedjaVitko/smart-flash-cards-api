// --------------------------
// Configuration
// --------------------------
const port = 4000;
const ROOTPATH = process.cwd();

// --------------------------
// External Imports
// --------------------------
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const autoload = require('auto-load');

const ctrl = autoload(path.join(ROOTPATH, '/controllers'))

// --------------------------
// Define Express app
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