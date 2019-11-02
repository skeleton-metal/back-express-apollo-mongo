import winston from "winston";


const graphqlErrorTransports = [
    new winston.transports.File({
        filename: 'logs/graphql-error.log',
        level: 'error',
        handleExceptions: true
    }),
    new winston.transports.Console({
        handleExceptions: true
    })
]


function createGraphqlErrorLogger(transports) {
    const graphqlErrorLogger = winston.createLogger({
        level: 'error',
        format: getGraphqlErrorLogFormatter(),
        transports: transports
    })

    return graphqlErrorLogger
}

function getGraphqlErrorLogFormatter() {
    const {combine, timestamp, colorize, printf} = winston.format;

    return combine(
        timestamp(),
        printf(info => `${info.timestamp} ${info.level} ${info.message} `)
    );
}

export const graphqlErrorLogger =  createGraphqlErrorLogger(graphqlErrorTransports);