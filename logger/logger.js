const winston = require("winston");
const { customLevels, formatter } = require("./loggerConfig");

module.exports = class Logger {

    constructor() {
        const prodTransport = new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
        });

        const transport = new winston.transports.Console({
            format: formatter,
        });

        this.logger = winston.createLogger({
            level: isDevEnvironment() ? 'trace' : 'error',
            levels: customLevels.levels,
            transports: [isDevEnvironment() ? transport : prodTransport],
        });

        winston.addColors(customLevels.colors);
    }

    trace(msg, meta) {
        this.logger.log('trace', msg, meta);
    }

    debug(msg, meta) {
        this.logger.debug(msg, meta);
    }

    info(msg, meta) {
        this.logger.info(msg, meta);
    }

    warn(msg, meta) {
        this.logger.warn(msg, meta);
    }

    error(msg, meta) {
        this.logger.error(msg, meta);
    }

    fatal(msg, meta) {
        this.logger.log('fatal', msg, meta);
    }
}