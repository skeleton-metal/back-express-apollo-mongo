import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
    name: { type: String, unique : true, required : true, dropDups: true },
    permissions: [{  type: String, required: true }],

});

RoleSchema.set('toJSON', { getters: true });

export const Role = mongoose.model('Role', RoleSchema);