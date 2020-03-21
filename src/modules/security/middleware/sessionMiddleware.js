import {updateSession} from "../services/SessionService";

export default async function sessionMiddleware(req, res, next) {

    if (req.user) {
        updateSession(req.user)
    }

    next()
}


