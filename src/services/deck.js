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

exports.updateDeckWithCard = (deckId, cardId) => {
    Deck.findOneAndUpdate({
        _id: deckId
    }, {
        $push: {
            cards: cardId
        }
    }).exec();
}

exports.getDeckCardIds = async (deckId) => {
    const deck = await Deck.findOne({
        _id: deckId
    });

    return deck.cards;
} 