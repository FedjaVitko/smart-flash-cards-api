const Card = require('../controllers/card');
const wrapAsync = require('../utils/controllers').wrapAsync;

module.exports = api => {
    api.route('/cards').get(wrapAsync(Card.list));
    api.route('/cards/:cardId').get(wrapAsync(Card.get));

    api.route('/cards').post(wrapAsync(Card.post));
    api.route('/cards/:cardId').delete(wrapAsync(Card.delete));
};