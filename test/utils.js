const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const { capitalize } = require('lodash');

const api = require('../src/server');
const config = require('../src/config');
const db = require('../src/utils/db');

var mockClient = null;

exports.dropDBs = async () => {
    const mongo = await db;
    await mongo.connection.dropDatabase();
    // TODO: later Redis
}

exports.loadFixture = async (...fixtures) => {
    for (const fixture of fixtures) {
        const batch = require(`./fixtures/${fixture}.json`);

        for (const models of batch) {
            for (const modelName in models) {
                const fixedData = models[modelName].map(data => {
                    // XXX: cloning loaded json to enable filtering without thinking about module cache
                    data = Object.assign({}, data);
                    // XXX: conver things that look like ObjectID to actual ObjectID
                    //      instances to enable mongo references
                    for (const key in data) {
                        // XXX: reject number attributes (see bug: https://jira.mongodb.org/browse/NODE-1146)
                        if (typeof data[key] !== 'number' && mongoose.Types.ObjectId.isValid(data[key])) {
                            data[key] = mongoose.Types.ObjectId(data[key]);
                        }
                    }
                    return data;
                });
                const filter = (x => x);
                const filteredData = filter(fixedData);

                const modulePath = `../src/models/${capitalize(modelName)}`;
                //XXX: hack to avoid loading models explicitly before loading fixtures
				//     also avoids compiling model modules twice as mocked module loader
				//     with babel forces recompilation of transpiled source code which
                //     causes double-registration of mongoose models
                const cachedModule = require.cache[require.resolve(modulePath)];
                const model = cachedModule ? cachedModule.exports : require(modulePath);
                await Promise.all(
                    filteredData.map(f => {
                        return model.create(f);
                    }),
                );
            }
        }
    }
}