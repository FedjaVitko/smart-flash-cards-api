const Deck = require('../controllers/deck');
const controllerHandler = require('../utils/controllers').controllerHandler;
const { check } = require('express-validator/check');

module.exports = api => {
    api.route('/decks').get(controllerHandler(Deck.list));
    api.route('/decks/:deckId').get(controllerHandler(Deck.get));

    api.route('/decks').post([
        check('name').isLength({ min: 1 }).withMessage('Please come up with a name for the deck!'),
    ], controllerHandler(Deck.post, req => [ req.body ]));

    api.route('/decks/:deckId').delete(controllerHandler(Deck.delete));
};