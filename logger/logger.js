const winston = require("winston");
const { customLevels, formatter } = require("./logConfig");
const { isProduction } = require("./../utils/appUtils");

winston.addColors(customLevels.colors);

const prodTransport = new winston.transports.File({
    filename: 'logs/error.log',
    format: formatter,
    level: 'error',
});

const transport = new winston.transports.Console({
    format: formatter,
})

module.exports = winston.createLogger({
    level: isProduction() ? 'error' : 'trace',
    levels: customLevels.levels,
    transports: [isProduction() ? prodTransport: transport],
});