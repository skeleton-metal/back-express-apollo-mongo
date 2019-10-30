import winston from 'winston'

const generalTransports = [
    new winston.transports.File({
        filename: 'logs/combined.log',
        level: 'info'
    }),
    new winston.transports.File({
        filename: 'logs/errors.log',
        level: 'error',
        handleExceptions: true
    }),
    new winston.transports.Console({
        handleExceptions: true
    })
]

const errorTransports = [
    new winston.transports.File({
        filename: 'logs/errors.log',
        level: 'error',
        handleExceptions: true
    }),
    new winston.transports.Console({
        handleExceptions: true
    })
]

const requestTransport = [
    new winston.transports.File({
        filename: 'logs/request.log',
        level: 'info'
    }),
]

const graphqlTransport = [
    new winston.transports.File({
        filename: 'logs/graphql.log',
        level: 'info'
    }),
]



winston.exceptions.handle(
    new winston.transports.File({filename: 'logs/exceptions.log'})
);


module.exports = {
    requestLogger: createRequestLogger(requestTransport),
    graphqlLogger: createGraphqlLogger(graphqlTransport),
    errorLogger: createErrorLogger(errorTransports),
    logger: winston.createLogger({transports: generalTransports, format: getGeneralLogFormatter()})
}

function createRequestLogger(transports) {
    const requestLogger = winston.createLogger({
        format: getRequestLogFormatter(),
        transports: transports
    })

    return function logRequest(req, res, next) {
        requestLogger.info({req, res})
        next()
    }
}

function createGraphqlLogger(transports) {
    const gqlLogger = winston.createLogger({
        format: getGraphqlLogFormatter(),
        transports: transports
    })

    return gqlLogger
}

function createErrorLogger(transports) {
    const errLogger = winston.createLogger({
        level: 'error',
        format: getGeneralLogFormatter(),
        transports: transports
    })

    return function logError(err, req, res, next) {
        errLogger.error({err, req, res})
        next()
    }
}

function getGeneralLogFormatter() {
    const {combine, timestamp, colorize, printf} = winston.format;

    return combine(
        timestamp(),
        printf(info => `${info.timestamp} ${info.level} ${info.message} `)
    );
}


function getRequestLogFormatter() {
    const {combine, timestamp, printf} = winston.format;

    return combine(
        timestamp(),
        printf(info => {
            const {req, res} = info.message;
            return `${info.timestamp} ${info.level} ip: ${req.ip} user: ${req.user ? req.user.username : 'anonymous'} ${req.hostname}${req.port || ''}${req.originalUrl} body: ${req.body} `;
        })
    );
}

function getGraphqlLogFormatter() {
    const {combine, timestamp, printf} = winston.format;

    return combine(
        timestamp(),
        printf(info => {
            console.log(info)
            return `${info.timestamp} ${info.level} op:??? `;
        })
    );
}