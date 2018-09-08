// --------------------------
// Internal Imports
// --------------------------
const express = require('express');

// --------------------------
// Router setup
// --------------------------
const router = express.Router();

// --------------------------
// Routes
// --------------------------
router.post('/', (req, res) => {
    const { question, answer, tokenizedAnswer } = req.body;
    
    console.log(question);
});

// --------------------------
// Export
// --------------------------
module.exports = router;

