const { getDeckCardIds } = require('../repositories/deck');
const { getSessionCards } = require('../services/learnSession');

module.exports.post = async ({ deckId, amount, difficulty }) => {
    const cardIds = await getDeckCardIds(deckId);
    return getSessionCards(cardIds, amount, difficulty);
};