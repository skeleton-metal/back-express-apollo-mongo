
import { createGroup, updateGroup, deleteGroup,  findGroup, fetchGroups, paginateGroup} from '../../services/GroupService'

export default {
    Query: {
        groups: (_, {}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            return fetchGroups()
        },
        group: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            return findGroup(id)
        },
        groupsPaginate: (_, {limit, pageNumber, search}) => {
            return paginateGroup(limit, pageNumber, search)
        },
        
    },
    Mutation: {
        groupCreate: (_, {input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, "SECURITY-ADMIN-CREATE")) throw new ForbiddenError("Not Authorized")
            return createGroup(user, input)
        },
          groupUpdate: (_, {id, input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, "SECURITY-ADMIN-UPDATE")) throw new ForbiddenError("Not Authorized")
            return updateGroup(user, id, input)
        },
         groupDelete: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, "SECURITY-ADMIN-DELETE")) throw new ForbiddenError("Not Authorized")
            return deleteGroup(id)
        },
    }

}

