const { validationResult } = require('express-validator/check');

/**
 * https://stackoverflow.com/questions/41875617/building-enterprise-app-with-node-express
 * 
 * Handles controller execution and responds to the user (API Express version).
 * Web socket has a similar handler implementation.
 * @param promise Controller Promise. I.e. getUser.
 * @param params A function (req, res, next), all of which are optional
 * that maps our desired controller parameters. I.e. (req) => [req.params.username, ...].
 */
const controllerHandler = (promise, params) => async (req, res, next) => {
    const boundParams = params ? params(req, res, next) : [];
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }

        const result = await promise(...boundParams);
        return res.status(201).json(result || { message: 'OK' });
    } catch (e) {
        return next(e);
    }
}

exports.controllerHandler = controllerHandler;