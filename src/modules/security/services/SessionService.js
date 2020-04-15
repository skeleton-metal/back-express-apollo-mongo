import {Sessions} from "../models/SessionModel";
import moment from "moment";
import DeviceDetector from 'node-device-detector'
import geoip from 'geoip-lite'

const detector = new DeviceDetector;

function getGeo(ip) {
    let geo = {}
    if (ip === '127.0.0.1') {
        geo = {
            country: 'AR',
            region: 'Local',
            city: 'Local',
            timezone: '',
        }
    } else {
        geo = geoip.lookup(ip)
    }
    return geo;
}

function getIpv4(ip){
    if(ip === '::1'){
        return '127.0.0.1'
    }
    return ip.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)[0]
}

export const createSession = async function (user, req) {
    return new Promise(((resolve, reject) => {
        let userAgent = req.headers['user-agent']
        const result = detector.detect(userAgent);

        let ip = getIpv4((req.headers['x-forwarded-for'] || req.connection.remoteAddress))
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

function getFromDate(time, unit) {
    let now = moment()
    let from = now.subtract(time, unit)
    return from.toDate();
}


export const sessionsByUser = async function (time, unit = 'days') {
    return new Promise((resolve, reject) => {
        Sessions.aggregate(
            [
                {$match: {since: {$gte: getFromDate(time, unit)}}},
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




export const sessionsByCountry = async function (time, unit = 'days') {
    return new Promise((resolve, reject) => {
        Sessions.aggregate(
            [
                {$match: {since: {$gte: getFromDate(time, unit)}}},
                {
                    $group: {
                        _id: "$geo.country",
                        country: {$last: "$geo.country"},
                        sum: {$sum: 1},
                    }
                }
            ], function (err, result) {
                resolve(result)
            })

    })

}

export const sessionsByOs = async function (time, unit = 'days') {
    return new Promise((resolve, reject) => {
        Sessions.aggregate(
            [
                {$match: {since: {$gte: getFromDate(time, unit)}}},
                {
                    $group: {
                        _id: "$os.name",
                        osname: {$last: "$os.name"},
                        sum: {$sum: 1},
                    }
                }
            ], function (err, result) {
                resolve(result)
            })

    })

}

export const sessionsByDeviceType = async function (time, unit = 'days') {
    return new Promise((resolve, reject) => {
        Sessions.aggregate(
            [
                {$match: {since: {$gte: getFromDate(time, unit)}}},
                {
                    $group: {
                        _id: "$device.type",
                        devicetype: {$last: "$device.type"},
                        sum: {$sum: 1},
                    }
                }
            ], function (err, result) {
                resolve(result)
            })

    })

}


export const sessionsByCity = async function (time, unit = 'days') {
    return new Promise((resolve, reject) => {
        Sessions.aggregate(
            [
                {$match: {since: {$gte: getFromDate(time, unit)}}},
                {
                    $group: {
                        _id: "$geo.city",
                        city: {$last: "$geo.city"},
                        sum: {$sum: 1},
                    }
                }
            ], function (err, result) {
                resolve(result)
            })

    })

}


export const sessionsByClient = async function (time, unit = 'days') {
    return new Promise((resolve, reject) => {
        Sessions.aggregate(
            [
                {$match: {since: {$gte: getFromDate(time, unit)}}},
                {
                    $group: {
                        _id: "$client.name",
                        clientname: {$last: "$client.name"},
                        sum: {$sum: 1},
                    }
                }
            ], function (err, result) {
                resolve(result)
            })

    })

}
