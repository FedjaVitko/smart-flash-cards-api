const { processTokenizedAnswer } = require('../utils/tokenizer');
const { createCard } = require('../repositories/card');

module.exports.list = async () => {
    // res.send('Here all cards  will be returned.');
};

module.exports.get = async () => {
    // res.send('Here the card with the id of ' + req.params.cardId + ' will be returned.');
};

module.exports.post = async ({ question, answer, tokenizedAnswerJson, deckId }) => {
    const processedTokenizedAnswerJson = processTokenizedAnswer(tokenizedAnswerJson);
    return await createCard(question, answer, processedTokenizedAnswerJson, deckId);
};

module.exports.delete = async () => {
    // res.send('Here the card with the id of ' + req.params.cardId + ' will be deleted.');
};