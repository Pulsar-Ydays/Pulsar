import hashPassword from "../hashPassword";
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true });

// Hash password before saving (on creation or modification)
userSchema.pre('save', async function (next) {
    const user = this as any;
    if (!user.isModified('password')) return next();

    try {
        user.password = await hashPassword(user.password);
        next();
    } catch (error:any) {
        next(error);
    }
});

// Hash password on update if password is being modified
userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate() as any;
    if (update.password) {
        try {
            update.password = await hashPassword(update.password);
        } catch (error:any) {
            return next(error);
        }
    }
    next();
});

export default mongoose.model('User', userSchema);
