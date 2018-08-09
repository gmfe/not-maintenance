const log4js = require('log4js');

const logger = log4js.getLogger('console');
logger.level = 'debug';
console.log = logger.info.bind(logger);
console.info = logger.info.bind(logger);
console.error = logger.error.bind(logger);
console.warn = logger.error.bind(logger);
console.warn = logger.error.bind(logger);
console.debug = logger.debug.bind(logger);