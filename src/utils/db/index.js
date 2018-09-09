const mongoose = require('mongoose');

const config = require('../../config');


mongoose.Promise = global.Promise;

const connection = mongoose.connect(
    config.database.uri,
    {
        autoIndex: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
        useNewUrlParser: true
    },
);

connection
    .then(db => {
        console.info(
            `Successfully connected to ${config.database.uri} MongoDB cluster in ${config.env} mode.`
        );
        return db;
    })
    .catch(err => {
        if (err.message.code === 'ETIMEDOUT') {
            console.info('Attempting to re-establish database connection');
            mongoose.connect(config.database.uri);
        } else {
            console.error('Error while attempting to connect to database:', { err });
        }
    });

module.exports = connection;
