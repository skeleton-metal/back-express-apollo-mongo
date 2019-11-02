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

    return function logError(requestContext) {
        let info = {};
        info.user = requestContext.context.user.username || ""
        info.operation = requestContext.operationName || ""
        requestContext.errors.forEach(error => {
            info.msg = error.message || ""
            info.code = error.extensions.code || ""
            graphqlErrorLogger.error(info)
        })

    }

    return graphqlErrorLogger
}

function getGraphqlErrorLogFormatter() {
    const {combine, timestamp, printf} = winston.format;

    return combine(
        timestamp(),
        printf(info => {
            const {user, operation, code, msg} = info.message;
            return `${info.timestamp} ${info.level} USER:${user} OP:${operation} CODE: ${code}  MSG: ${msg} `
        })
    );
}

export const graphqlErrorLogger = createGraphqlErrorLogger(graphqlErrorTransports);