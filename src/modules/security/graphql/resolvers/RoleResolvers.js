import {createRole, findRole, findRoles} from '../../services/RoleService'

export default {
    Query: {
        roles: () => {
            return findRoles()
        },
        role: (_, {id}) => {
            return findRole(id)
        },
    },
    Mutation: {
        createRole: (_, {input}) => {
            return createRole(input)
        },
    }

}
