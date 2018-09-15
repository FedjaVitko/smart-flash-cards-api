const Deck = require('../models/Deck');

exports.createDeck = (name) => {
    const deck = Deck.create({
        name
    });

    return deck;
}

exports.listDecks = () => {
    return Deck.find({});
}