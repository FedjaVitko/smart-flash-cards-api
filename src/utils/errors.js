const mongooseErrorHandler = require('../middlewares/mongooseErrorHandler');

setupExpressErrorHandler = app => {
    app.use(mongooseErrorHandler);
 
    app.use((err, req, res, next) => {
        var status =
            err.status ||
            err.statusCode ||
            500;
        // skip anything not marked as an internal server error
        if (status < 500) return next(err);
        console.error({ err });
        res.status(500).json('Internal server error!');
        return next(err);
    })
}

exports.setupExpressErrorHandler = setupExpressErrorHandler;