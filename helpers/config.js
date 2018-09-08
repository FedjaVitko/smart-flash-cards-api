const _ = require('lodash');

module.exports = {
    /**
     * Parse configuration value for environment variables
     * 
     * @param {any} cfg Configuration value
     * @returns Parsed configuration value
     */
    parseConfigValue (cfg) {
        return _.replace(
            cfg,
            /\$\(([A-Z0-9_]+)\)/g,
            (fm, m) => { return process.env[m] }
        )
    }
}