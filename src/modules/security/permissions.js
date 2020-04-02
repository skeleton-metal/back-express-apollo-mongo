//Convention: Module_Entity_Verb

//SECURITY
export const SECURITY_USER_CREATE = "SECURITY_USER_CREATE"
export const SECURITY_USER_EDIT = "SECURITY_USER_EDIT"
export const SECURITY_USER_DELETE = "SECURITY_USER_DELETE"
export const SECURITY_USER_SHOW = "SECURITY_USER_SHOW"

export const SECURITY_GROUP_CREATE = "SECURITY_GROUP_CREATE"
export const SECURITY_GROUP_EDIT = "SECURITY_GROUP_EDIT"
export const SECURITY_GROUP_DELETE = "SECURITY_GROUP_DELETE"
export const SECURITY_GROUP_SHOW = "SECURITY_GROUP_SHOW"

export const SECURITY_ROLE_SHOW = "SECURITY_ROLE_SHOW"
export const SECURITY_ROLE_CREATE = "SECURITY_ROLE_CREATE"
export const SECURITY_ROLE_EDIT = "SECURITY_ROLE_EDIT"

export const SECURITY_DASHBOARD_SHOW = "SECURITY_DASHBOARD_SHOW"


//CUSTOMIZATION
export const CUSTOMIZATION_COLORS_UPDATE = "CUSTOMIZATION_COLORS_UPDATE"
export const CUSTOMIZATION_LOGO_UPDATE = "CUSTOMIZATION_LOGO_UPDATE"
export const CUSTOMIZATION_LANG_UPDATE = "CUSTOMIZATION_LANG_UPDATE"


export const PERMISSIONS = [
    SECURITY_USER_CREATE, SECURITY_USER_EDIT, SECURITY_USER_DELETE, SECURITY_USER_SHOW,
    SECURITY_GROUP_CREATE, SECURITY_GROUP_EDIT, SECURITY_GROUP_DELETE, SECURITY_GROUP_SHOW,
    CUSTOMIZATION_COLORS_UPDATE, CUSTOMIZATION_LOGO_UPDATE, CUSTOMIZATION_LANG_UPDATE
]
