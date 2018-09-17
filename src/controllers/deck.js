const { createDeck, listDecks } = require('../repositories/deck');

module.exports.list = async () => {
    return listDecks();
};

module.exports.get = async () => {
    // res.send('Here the deck with the id of ' + req.params.deck + ' will be returned.');
};

module.exports.post = async ({ name }) => {
    return createDeck(name);
};

module.exports.delete = async () => {
    // res.send('Here the card with the id of ' + req.params.deck + ' will be deleted.');
};