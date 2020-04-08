import {
    sessionsByCity, sessionsByClient,
    sessionsByCountry,
    sessionsByDeviceType,
    sessionsByOs,
    sessionsByUser
} from '../../services/SessionService'
import {AuthenticationError} from "apollo-server-express";

export default {
    Query: {
        sessionsByUser: (_, {}, {user, rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            return sessionsByUser(30, 'days')
        },
        sessionsByCountry: (_, {}, {user, rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            return sessionsByCountry(30, 'days')
        },
        sessionsByOs: (_, {}, {user, rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            return sessionsByOs(30, 'days')
        },
        sessionsByDeviceType: (_, {}, {user, rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            return sessionsByDeviceType(30, 'days')
        },
        sessionsByCity: (_, {}, {user, rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            return sessionsByCity(30, 'days')
        },
        sessionsByClient: (_, {}, {user, rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            return sessionsByClient(30, 'days')
        },
    },


}

