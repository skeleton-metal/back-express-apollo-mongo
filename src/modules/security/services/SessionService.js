import {Sessions} from "../models/Session";
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

export const createSession = async function (user, req) {
    return new Promise(((resolve, reject) => {
        let userAgent = req.headers['user-agent']
        const result = detector.detect(userAgent);

        let ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress)
        let geo = getGeo(ip);

        const newSession = new Sessions({
            user: user.id,
            username: user.username,
            agent: userAgent,
            ip: ip,
            os: result.os,
            client: result.client,
            device: result.device,
            geo: geo
        })

        newSession.id = newSession._id

        newSession.save().then(() => {
            resolve(newSession)
        }).catch(err => {
            console.log(err)
            reject(err)
        })

    }))

}


export const updateSession = async function (user) {
    Sessions.findOne({_id: user.idSession}).then(doc => {
        let now = moment()
        doc.until = now
        doc.duration = now.diff(doc.since, 'seconds')
        doc.request++
        doc.save()
    })
}


export const sessionsByUser = async function (time, unit = 'days') {
    return new Promise((resolve, reject) => {
        let now = moment()
        let from = now.subtract(time, unit)
        console.log(from.toISOString())
        Sessions.aggregate(
            [
                {$match: {since: {$gte: from.toDate()}}},
                {
                    $group: {
                        _id: "$username",
                        username: {$last: "$username"},
                        sessionCount: {$sum: 1},
                        durationMin: {$min: "$duration"},
                        durationMax: {$max: "$duration"},
                        durationAvg: {$avg: "$duration"},
                        durationSum: {$sum: "$duration"},
                        durationLast: {$last: "$duration"},
                        requestSum: {$sum: "$request"},
                        requestAvg: {$avg: "$request"},
                    }
                }
            ], function (err, result) {
                console.log(result)

                resolve(result)
            })

    })

}
