const Card = require('../models/Card');

const deckService = require('./deck');

// =======================
// public functions
// =======================

exports.processTokenizedAnswer = (tokenizedAnswerJson) => {
    const parsedTokenizedAnswer = JSON.parse(tokenizedAnswerJson);
    const tokens = Object.keys(parsedTokenizedAnswer);

    const processedTokenizedAnswer = tokens.reduce((processedAnswer,token) => {
        const weight = parsedTokenizedAnswer[token];
        const preparedToken = prepareToken(token);
        const similarTokens = generateSimilarTokens(preparedToken, weight);

        processedAnswer[preparedToken] = {
            weight,
            similarTokens
        };

        return processedAnswer;
    }, {});

    return JSON.stringify(processedTokenizedAnswer);
}

exports.createCard = async (question, answer, processedTokenizedAnswerJson, deckId) => {
    const card = await Card.create({
        question,
        answer,
        tokenizedAnswerJson: processedTokenizedAnswerJson
    });

    deckService.updateWithCard(deckId, card._id);

    return card;
}

exports.getSessionCards = async (cardIds, amount, difficulty) => {
    const candidateCards = await Card.find({
        '_id' : {
            $in : cardIds            
        }
    });

    if (amount > candidateCards.length) {
        amount = candidateCards.length;
    }

    return candidateCards.reduce((choosenCards, candidateCard) => {
        const haveEnough = amount < choosenCards.length;

        if (!haveEnough && isChoosen(candidateCard, difficulty)) {
            choosenCards.push(candidateCard);
        }

        return choosenCards;
    }, []);
}

// =======================
// private functions
// =======================

isChoosen = ({ difficulty }, desiredDifficulty) => {
    return true; // TODO: will have a mapping
}

prepareToken = (token) => {
    const allPunctuation = /[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g;
    return token.trim().toLowerCase().replace(allPunctuation, "");
}

generateSimilarTokens = (token, weight) => {
    const similarTokens = [];
    
    if (weight === 0) {
        return similarTokens;
    }

    const charsToOmit = calculateCharsToOmit(token.length);

    for (let i = 1; i < charsToOmit; i++) {
        const slicedToken = token.slice(0, -i);
        similarTokens.push(slicedToken);
    }

    return similarTokens;
}

calculateCharsToOmit = (tokenLength) => {
    if (tokenLength < 3) {
        return 0;
    } else if (tokenLength < 6) {
        return 2;
    } else if (tokenLength < 9) {
        return 3;
    } else if (tokenLength < 12) {
        return 5;
    } else if (tokenLength < 15) {
        return 6;
    } else {
        return 7;
    }
}