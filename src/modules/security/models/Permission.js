import mongoose from 'mongoose';

const PermissionSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

PermissionSchema.set('toJSON', { getters: true });

export const Permission = mongoose.model('Permission', PermissionSchema);