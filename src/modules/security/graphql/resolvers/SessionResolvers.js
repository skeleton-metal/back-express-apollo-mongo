
import { sessionsByUser} from '../../services/SessionService'

export default {
    Query: {
        sessionsByUser: (_, {}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            return sessionsByUser(30)
        },
        
    },


}

