import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', true)

import {findUserByUsername,changePassword} from '../services/UserService'
import {INIT_USER_ADMIN} from '../consts'

findUserByUsername("root").then(rootUser => {
    changePassword(rootUser.id, {
        password: INIT_USER_ADMIN.password,
        passwordVerify: INIT_USER_ADMIN.password
    }).then(result => {
        console.log(result)
        process.exit()
    })
})
