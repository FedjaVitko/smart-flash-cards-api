const Card = require('../controllers/card');
const controllerHandler = require('../utils/controllers').controllerHandler;
const { check } = require('express-validator/check');

module.exports = api => {
    api.route('/cards').get(controllerHandler(Card.list));
    api.route('/cards/:cardId').get(controllerHandler(Card.get));

    api.route('/cards').post([
        check('question').isLength({ min: 10 }).withMessage('Please come up with a question!'),
        check('answer').isLength({ min: 1 }).withMessage('Please come up with an answer!')
    ], controllerHandler(Card.post, req => [ req.body ]));

    api.route('/cards/:cardId').delete(controllerHandler(Card.delete));
};