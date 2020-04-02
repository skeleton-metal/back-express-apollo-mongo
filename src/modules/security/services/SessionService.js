import {Sessions} from "../models/Session";
import moment from "moment";
import  DeviceDetector from 'node-device-detector'
import geoip from 'geoip-lite'
const detector = new DeviceDetector;

export const createSession = async function (user, req) {
   return new Promise(((resolve, reject) => {
       let userAgent = req.headers['user-agent']
       const result = detector.detect(userAgent);

       let ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress)
       let geo = geoip.lookup(ip)

       const newSession = new Sessions({
           user: user.id,
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
    Sessions.findOneAndUpdate({_id: user.idSession}, {until: moment()}).exec()
}
