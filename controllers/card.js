const mongoose = require('mongoose');


module.exports.list = async (req, res) => {
    res.send('Here all cards  will be returned.');
};

module.exports.get = async (req, res) => {
    res.send('Here the card with the id of ' + req.params.cardId + ' will be returned.');
};

module.exports.post = async (req, res) => {
    const { question, answer, tokenizedAnswer } = req.body;
    
    console.log(question);
};

module.exports.delete = async (req, res) => {
    res.send('Here the card with the id of ' + req.params.cardId + ' will be deleted.');
};