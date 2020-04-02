import {createRole, findRole, findRoles} from '../../services/RoleService'
import {SECURITY_ROLE_CREATE, SECURITY_ROLE_SHOW} from "../../permissions";
import {ForbiddenError} from "apollo-server-express";

export default {
    Query: {
        roles: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if (!user || !rbac.isAllowed(user.id, SECURITY_ROLE_SHOW)) throw new ForbiddenError("Not Authorized")
            return findRoles()
        },
        role: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if (!user || !rbac.isAllowed(user.id, SECURITY_ROLE_SHOW)) throw new ForbiddenError("Not Authorized")
            return findRole(id)
        },
    },
    Mutation: {
        createRole: (_, {input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if (!user || !rbac.isAllowed(user.id, SECURITY_ROLE_CREATE)) throw new ForbiddenError("Not Authorized")
            return createRole(input)
        },
    }

}
