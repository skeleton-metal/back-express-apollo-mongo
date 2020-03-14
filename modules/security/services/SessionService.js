import {Sessions} from "../models/sessions";
import moment from "moment";

export const createSession = async function (user, req) {
    const newSession = new Sessions({
        user: user.id,
        agent: req.headers['user-agent'],
        ip: (req.headers['x-forwarded-for'] || req.connection.remoteAddress)
    })

    newSession.id = newSession._id
    await newSession.save()
    return newSession
}


export const updateSession = async function (user) {
    Sessions.findOneAndUpdate({_id: user.idSession}, {until: moment()}).exec()
}
