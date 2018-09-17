const Card = require('../models/Card');
const { updateDeckWithCard } = require('./deck');

exports.getCardsByIds = async (cardIds) => {
    return await Card.find({
        '_id' : {
            $in : cardIds            
        }
    });
}

exports.createCard = async (question, answer, processedTokenizedAnswerJson, deckId) => {
    const card = await Card.create({
        question,
        answer,
        tokenizedAnswerJson: processedTokenizedAnswerJson
    });

    updateDeckWithCard(deckId, card._id);

    return card;
}