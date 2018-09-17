const learnSession = require('../controllers/learnSession');
const controllerHandler = require('../utils/controllers').controllerHandler;
const { check } = require('express-validator/check');

module.exports = api => {
    api.route('/learnsession').post([
        check('amount').isLength({ min: 1 }).withMessage('Please choose the amount of cards!'),
        check('difficulty').isLength({ min: 1 }).withMessage('Please pick a difficulty'),
    ], controllerHandler(learnSession.post, req => [ req.body ]));
};