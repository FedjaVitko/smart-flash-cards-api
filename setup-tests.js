const fs = require('fs');
const path = require('path');
const Mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { stringify } = require('flatted/cjs');

const config = require('./src/config');
const api = require('./src/server');
const { dropDBs } = require('./test/utils');

api.use((err, req, res, next) => {
    if (err) {
        console.error(err.stack);
        if (err.request) {
            console.error(`REQUEST = ${stringify(err.request)}`);
        }
        if (err.response) {
            console.error(`RESPONSE = ${stringify(err.response)}`);
        }
    }
    next(err, req, res);
});

chai.use(chaiHttp);

function wrapMocha(onPrepare, onUnprepare) {
    // Monkey-patch run method
    const run = Mocha.prototype.run;

    // XXX: using function syntax instead of fat-arrow syntax
    //      to avoid implicit binding of `this`
    Mocha.prototype.run = function(done) {
        const self = this;
        onPrepare()
            .then(() => {
                // XXX: ditto
                run.call(self, function() {
                    if (typeof onUnprepare === 'function') {
                        onUnprepare.apply(this, arguments);
                    }
                    done.apply(this, arguments);
                })
            })
            .catch(err => {
                if (err instanceof Error) {
                    console.error(err.stack);
                }
                process.exit(1);
            })
    };
}

wrapMocha(
    async () => {
        if (!config.database.uri) {
            throw new Error('Missing MongoDB connection string. Check config');
        }
        if (
            !config.database.uri.includes('localhost') &&
            !config.database.uri.includes('127.0.0.1')
        )
            throw new Error(
                'MongoDB connection string contains non-local address. For safety reasons test suite can only connect to local databases. Check config',
            );
        
        // XXX: drop all data before running tests
        await dropDBs();

        fs.readdirSync(path.join(__dirname, 'src', 'routes')).forEach(file => {
            if (file.endsWith('.js')) {
                require(`./src/routes/${file}`)(api);
            }
        });
    },
    failures => {
        const timeout = 1500;
        setTimeout(() => process.exit(failures ? 1 : 0), timeout);
    }
)

