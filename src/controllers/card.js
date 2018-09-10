const mongoose = require('mongoose');
const config = require('../config');

const Card = require('../models/Card');

module.exports.list = async (req, res) => {
    res.send('Here all cards  will be returned.');
};

module.exports.get = async (req, res) => {
    res.send('Here the card with the id of ' + req.params.cardId + ' will be returned.');
};

module.exports.post = async (req, res) => {
    const { question, answer, tokenizedAnswerJson } = req.body;

    const processedTokenizedAnswerJson = JSON.stringify(processTokenizedAnswer(tokenizedAnswerJson));

    const data = {
        question,
        answer,
        tokenizedAnswerJson: processedTokenizedAnswerJson
    }
    
    res.status(201).json(await Card.create(data));
};

module.exports.delete = async (req, res) => {
    res.send('Here the card with the id of ' + req.params.cardId + ' will be deleted.');
};

// ----------------------------
// processTokenizedAnswer START
// ----------------------------

function processTokenizedAnswer (tokenizedAnswerJson) {
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

    return processedTokenizedAnswer;
}

function prepareToken (token) {
    const allPunctuation = /[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g;
    return token.trim().toLowerCase().replace(allPunctuation, "");
}

function generateSimilarTokens (token, weight) {
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

function calculateCharsToOmit (tokenLength) {
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

// ----------------------------
// processTokenizedAnswer END
// ----------------------------