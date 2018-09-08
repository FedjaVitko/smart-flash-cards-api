const fs = require('fs');
const yaml = require('js-yaml');
const _ = require('lodash');
const path = require('path');
const cfgHelper = require('../helpers/config');

/**
 * Load Applicaton Configuration
 * 
 * @param  {Object} confPaths Path to the configuration files
 * @return {Object} Application Configuration
 */
module.exports = (confPaths) => {
    confPaths = _.defaults(confPaths, {
        config: path.join(ROOTPATH, 'config.yml')
    });

    let appConfig = {};

    try {
        appConfig = yaml.safeLoad(
            cfgHelper.parseConfigValue(
                fs.readFileSync(confPaths.config, 'utf8')
            )
        );
    } catch (ex) {
        console.error(ex);
        process.exit(1);
    }

    return {
        config: appConfig
    }
}