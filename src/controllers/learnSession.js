const { getDeckCardIds } = require('../services/deck');
const { getSessionCards } = require('../services/card');

module.exports.post = async ({ deckId, amount, difficulty }) => {
    const cardIds = await getDeckCardIds(deckId);
    return getSessionCards(cardIds, amount, difficulty);
};