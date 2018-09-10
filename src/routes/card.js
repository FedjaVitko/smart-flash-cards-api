const Card = require('../controllers/card');
const controllerHandler = require('../utils/controllers').controllerHandler;

module.exports = api => {
    api.route('/cards').get(controllerHandler(Card.list));
    api.route('/cards/:cardId').get(controllerHandler(Card.get));

    api.route('/cards').post(controllerHandler(Card.post, req => [ req.body ]));
    api.route('/cards/:cardId').delete(controllerHandler(Card.delete));
};