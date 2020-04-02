import LoginFail from "../models/LoginFailModel";
import moment from "moment";
import DeviceDetector from 'node-device-detector'
import geoip from 'geoip-lite'

const detector = new DeviceDetector;

function getGeo(ip) {
    let geo = {}
    if (ip == '::1') {
        geo = {
            country: 'Local',
            region: 'Local',
            city: 'Local',
            timezone: '',
        }
    } else {
        geo = geoip.lookup(ip)
    }
    return geo;
}

export const createLoginFail = async function (username, req) {
    return new Promise(((resolve, reject) => {
        let userAgent = req.headers['user-agent']
        const result = detector.detect(userAgent);

        let ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress)
        let geo = getGeo(ip);

        const doc = new LoginFail({
            username: username,
            agent: userAgent,
            ip: ip,
            os: result.os,
            client: result.client,
            device: result.device,
            geo: geo
        })

        doc.save().then(() => {
            resolve(doc)
        }).catch(err => {
            reject(err)
        })

    }))

}


export const loginFailByUsername = async function (time = 72, unit = 'hours') {
    return new Promise((resolve, reject) => {
        let now = moment()
        let from = now.subtract(time, unit)
        LoginFail.aggregate(
            [
                {$match: {date: {$gte: from.toDate() }}},
                {$group: {_id: "$username", username: {$last: "$username"}, attempts: {$sum: 1}}}
            ], function (err, result) {
                resolve(result)
            })

    })

}
