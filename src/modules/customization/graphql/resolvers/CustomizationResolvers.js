
import {
    createCustomization,
    updateCustomization,
    findCustomization,
    updateColors,
    updateLang,
    uploadLogo
} from '../../services/CustomizationService'

export default {
    Query: {

        customization: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            return findCustomization(id)
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

        colorsUpdate: (_, {input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, "SECURITY-ADMIN-UPDATE")) throw new ForbiddenError("Not Authorized")
            return updateColors(user, input)
        },

        langUpdate: (_, {input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, "SECURITY-ADMIN-UPDATE")) throw new ForbiddenError("Not Authorized")
            return updateLang(user, input)
        },

        logoUpload: (_, {input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, "SECURITY-ADMIN-UPDATE")) throw new ForbiddenError("Not Authorized")
            return uploadLogo(user, input)
        },

    }

}

