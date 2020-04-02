
import { loginFailByUsername} from '../../services/LoginFailService'

export default {
    Query: {
        loginFailByUsername: (_, {time, unit}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            return loginFailByUsername(time, unit)
        },
        
    },


}

