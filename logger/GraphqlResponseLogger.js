import winston from "winston";

const graphqlResponseTransport = [
    new winston.transports.File({
        filename: 'logs/graphql-response.log',
        level: 'info'
    }),
    new winston.transports.Console({
        handleExceptions: true
    })
]


function createGraphqResponselLogger(transports) {
    const graphqlResponseLogger = winston.createLogger({
        format: getGraphqlResponseLogFormatter(),
        transports: transports
    })

    return graphqlResponseLogger
}

function getGraphqlResponseLogFormatter() {
    const {combine, timestamp, printf} = winston.format;

    return combine(
        timestamp(),
        printf(info => {
            console.log(info)
            return `${info.timestamp} ${info.level} op:??? `;
        })
    );
}

export const graphqlResponseLogger =  createGraphqResponselLogger(graphqlResponseTransport);