import mongoose from 'mongoose';

// Defining user Mongoose Schema
const UserSchema = new mongoose.Schema({
    username: {type: String, unique : true, required : true, dropDups: true },
    email: {type: String, unique : true, required : true, dropDups: true },
    password: {type: String, required: true},
    name: {type: String, required: true},
    active: {type: Boolean, required: true, default: false},
    phone: {type: String, required: false},
    avatar: String,
    avatarurl: String,
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    createdAt: {type: Date, required: true},
    updatedAt: {type: Date, required: true, default: Date.now},
});

UserSchema.set('toJSON', {getters: true});

export const User = mongoose.model('User', UserSchema);