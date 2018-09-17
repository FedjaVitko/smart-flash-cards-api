const { getCardsByIds } = require('../repositories/card')

// =======================
// public functions
// =======================

exports.getSessionCards = async (cardIds, amount, difficulty) => {
    const candidateCards = await getCardsByIds(cardIds);

    if (amount > candidateCards.length) {
        amount = candidateCards.length;
    }

    return candidateCards.reduce((choosenCards, candidateCard) => {
        const haveEnough = amount < choosenCards.length;

        if (!haveEnough && isChosen(candidateCard, difficulty)) {
            choosenCards.push(candidateCard);
        }

        return choosenCards;
    }, []);
}

// =======================
// private functions
// =======================

isChosen = ({ difficulty }, desiredDifficulty) => {
    return true; // TODO: will have a mapping
}