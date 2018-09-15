const { processTokenizedAnswer, createCard } = require('../services/card');

module.exports.list = async (req, res) => {
    res.send('Here all cards  will be returned.');
};

module.exports.get = async (req, res) => {
    res.send('Here the card with the id of ' + req.params.cardId + ' will be returned.');
};

module.exports.post = async ({ question, answer, tokenizedAnswerJson, deckId }) => {
    const processedTokenizedAnswerJson = processTokenizedAnswer(tokenizedAnswerJson);
    return await createCard(question, answer, processedTokenizedAnswerJson, deckId);
};

module.exports.delete = async (req, res) => {
    res.send('Here the card with the id of ' + req.params.cardId + ' will be deleted.');
};