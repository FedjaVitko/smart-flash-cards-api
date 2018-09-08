/* global ROOTPATH */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

/**
 * MongoDB module
 * 
 * @return {Object} MongoDB wrapper instance
 */
module.exports = {

    /**
     * Initialize DB
     * 
     * @return {Object} DB instance
     */
    init() {
        const self = this;

        const dbModelsPath = path.join(ROOTPATH, 'models');

        mongoose.Promise = require('bluebird');

        mongoose.connection.on('error', err => {
            console.error('Failed to connect to MongoDB instance.');
            return err;
        });

        mongoose.connection.once('open', function () {
            console.log('Connected to MongoDB instance.');
        });

        // Expose connection handle
        self.connection = mongoose.connection;
        self.ObjectId = mongoose.Types.ObjectId;

        // Load DB Models
        fs
            .readdirSync(dbModelsPath)
            .filter(file => file.indexOf('.') !== 0)
            .forEach(file => {
                const modelName = _.upperFirst(_.camelCase(_.split(file, '.')[0]));
                self[modelName] = require(path.join(dbModelsPath, file));
            });
        
        // Connect
        self.onReady = mongoose.connect(appconfig.db, { useNewUrlParser: true });
    }
}