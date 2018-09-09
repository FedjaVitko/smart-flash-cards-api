const dotenv = require('dotenv');
const path = require('path');

const configs = {
    development: { config: 'dev' },
    production: { config: 'prod' },
    test: {
        config: 'test',
        env: path.resolve(__dirname, '..', '..', 'test', '.env'),
    },
}

const currentEnvironment = process.env.NODE_ENV || 'development';

const defaultPath = path.resolve(__dirname, '..', '..', '.env');
const envPath = configs[currentEnvironment].env || defaultPath;

console.log(`Loading .env from '${envPath}'`);
dotenv.config({ path: envPath });

const _default = {
    server: {
        port: process.env.API_PORT
    },
    database: {
        uri: process.env.DATABASE_URI
    },
    url: process.env.BASE_URL,
};

const config = require(`./${configs[currentEnvironment].config}`);

module.exports = Object.assign({ env: currentEnvironment }, _default, config);