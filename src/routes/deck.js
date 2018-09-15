const deck = require('../controllers/deck');
const controllerHandler = require('../utils/controllers').controllerHandler;
const { check } = require('express-validator/check');

module.exports = api => {
    api.route('/decks').get(controllerHandler(deck.list));
    api.route('/decks/:deckId').get(controllerHandler(deck.get));

    api.route('/decks').post([
        check('name').isLength({ min: 1 }).withMessage('Please come up with a name for the deck!'),
    ], controllerHandler(deck.post, req => [ req.body ]));

    api.route('/decks/:deckId').delete(controllerHandler(deck.delete));
};