const Card = require('../controllers/card');

module.exports = api => {
    api.route('/cards').get(Card.list);
    api.route('/cards/:cardId').get(Card.get);

    api.route('/cards').post(Card.post);
    api.route('/cards/:cardId').delete(Card.delete);
};