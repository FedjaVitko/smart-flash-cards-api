module.exports = (err, req, res, next) => {
    if (err.errors) {
        const messages = {};

        for (let field in err.errors) {
            messages[field] = err.errors[field].message;
        }

        res.status(422).json({ messages });
    }

    next(err);
};