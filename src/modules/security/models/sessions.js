const mongoose = require('mongoose')

var uniqueValidator = require('mongoose-unique-validator');

// Defining user Mongoose Schema
const SessionsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: false,
        required: true,
        dropDups: true
    },
    since: {type: Date, required: true, default: Date.now},
    until: {type: Date, required: true, default: Date.now},
    agent: {type: String, unique: false, required: true, dropDups: true},
    ip: {type: String, unique: false, required: true, dropDups: true},
});

SessionsSchema.set('toJSON', {getters: true});

SessionsSchema.plugin(uniqueValidator, {message: '{VALUE} ya existe. {PATH} debe ser unico.'});

module.exports = {
    Sessions: mongoose.model('Sessions', SessionsSchema),
    SessionsSchema: SessionsSchema
};