const Card = require('../models/Card');
const Deck = require('../models/Deck');
const mongoose = require('mongoose');

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

    console.log(card._id);

    const deck = await Deck.findOneAndUpdate({
        _id: deckId
    }, {
        $set: {
            'name' : 'Mama HELP!!!!!!'
        }
        // $push: {
        //     cards: mongoose.Types.ObjectId(card._id)
        // }
    }).exec();

    console.log(deck);

    return card;
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