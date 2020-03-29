
import { createCustomization, updateCustomization, deleteCustomization,  findCustomization, fetchCustomizations, paginateCustomization} from '../../services/CustomizationService'

export default {
    Query: {
        customizations: (_, {}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            return fetchCustomizations()
        },
        customization: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            return findCustomization(id)
        },
        customizationsPaginate: (_, {limit, pageNumber, search, orderBy, orderDesc}) => {
            return paginateCustomization(limit, pageNumber, search, orderBy, orderDesc)
        },
        
    },
    Mutation: {
        customizationCreate: (_, {input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, "SECURITY-ADMIN-CREATE")) throw new ForbiddenError("Not Authorized")
            return createCustomization(user, input)
        },
          customizationUpdate: (_, {id, input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, "SECURITY-ADMIN-UPDATE")) throw new ForbiddenError("Not Authorized")
            return updateCustomization(user, id, input)
        },
         customizationDelete: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, "SECURITY-ADMIN-DELETE")) throw new ForbiddenError("Not Authorized")
            return deleteCustomization(id)
        },
    }

}

