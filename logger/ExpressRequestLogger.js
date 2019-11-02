import winston from "winston";

const requestTransport = [
    new winston.transports.File({
        filename: 'logs/express-request.log',
        level: 'info'
    }),
    new winston.transports.Console({
        handleExceptions: true
    })
]


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

function fillSpace(str, length) {
    let diff = length - str.length
    for (let i = 0; i < diff; i++) {
        str += " "
    }
    return str
}

function sanatizeIp(ip){
    return ip.replace("::ffff:","")
}

function getRequestLogFormatter() {
    const {combine, timestamp, printf, colorize} = winston.format;


    return combine(
        timestamp(),
        printf(info => {
            const {req, res} = info.message;
            let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            ip = sanatizeIp(ip)
            return `${info.timestamp} ${info.level} REQUEST ${fillSpace(req.method,7)} IP: ${ip} DST: ${req.hostname}${req.port || ''}${req.originalUrl} USER: ${req.user ? req.user.username : 'anonymous'} ${req.body ? req.body.operationName ? " OPERATION:" + req.body.operationName : "" : ""} `;
        })
    );
}


export const expressRequestLogger = createRequestLogger(requestTransport);