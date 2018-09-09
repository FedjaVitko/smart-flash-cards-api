const mongoose = require('mongoose');
const config = require('../config');

const Card = require('../models/card');

module.exports.list = async (req, res) => {
    res.send('Here all cards  will be returned.');
};

module.exports.get = async (req, res) => {
    res.send('Here the card with the id of ' + req.params.cardId + ' will be returned.');
};

module.exports.post = async (req, res) => {
    const card = await Card.create(req.body);

    res.json(await Card.findOne({ _id: card._id }));
};

module.exports.delete = async (req, res) => {
    res.send('Here the card with the id of ' + req.params.cardId + ' will be deleted.');
};