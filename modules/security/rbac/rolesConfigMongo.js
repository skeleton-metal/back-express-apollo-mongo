import {Role} from './../models/Role'

const rolesConfig = await Role.find({});

export default rolesConfig;