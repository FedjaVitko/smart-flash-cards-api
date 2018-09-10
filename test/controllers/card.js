const sinon = require('sinon');
const { expect, request } = require('chai');

const api = require('../../src/server');
const Card = require('../../src/models/Card');
const { loadFixture, dropDBs } = require('../utils');

describe('Card controller', () => {
    let card;

    before(async () => {
        await dropDBs();
        await loadFixture('cards');

        card = (await Card.find()
            .sort('_id')
            .limit(1))[0];
    });

    describe('creating new card', () => {
        describe('with correct user input', () => {
            it('should return 201 for valid request', async () => {
                const data = {
                    question : "What is the capital of Great Britain?",
                    answer : "London",
                    tokenizedAnswerJson : "{\"London\": 3}"
                }
                const response = await request(api).post('/cards').send(data);
    
                expect(response).to.have.status(201);
    
                const keys = ['_id', 'difficulty', 'question', 'answer', 'tokenizedAnswerJson'];
                expect(Object.keys(response.body)).to.include.members(keys);
                const newCard = await Card.findOne({ question: 'What is the capital of Great Britain?' });
    
                // expect(response.body._id).to.be.equal(String(newCard._id));
                expect(response.body.question).to.be.equal(data.question);
                expect(response.body.answer).to.be.equal(data.answer);
                expect(response.body.tokenizedAnswerJson).to.be.equal("{\"london\":{\"weight\":3,\"similarTokens\":[\"londo\",\"lond\"]}}");
            });
    
            it('should return 500 for invalid request', async () => {
                const data = {
                    question : "What is the capital of Great Britain?",
                    answer : "London",
                    tokenizedAnswerJson : "{\"London\" 3}"
                }
                const response = await request(api).post('/cards').send(data);
                
                expect(response).to.have.status(500);
            });
        });

        // describe('with incorrect user input', () => {
        //     it('should return 201 for empty fields', () => {
        //         const data = {
        //             question : "",
        //             answer : "",
        //             tokenizedAnswerJson : "{\"London\": 3}"
        //         }
        //     })
        // })
    })
});