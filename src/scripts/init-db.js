import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
mongoose.set('useCreateIndex', true)

import {initSecurity} from '../modules/security/services/UserInitService'

initSecurity()