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
    },
    walletId: {
        type: Array,
        required: true
    }
}, { timestamps: true });

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
    const user = this as any;
    try {
        console.log("Pass Hashed:");
        user.password = await hashPassword(user.password);
        next();
    } catch (error: any) {
        next(error);
    }
});

// Middleware to hash password on update if password is being modified
userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate() as any;

    // Check if the update contains a password and modify it only if necessary
    if (update.password) {
        try {
            update.password = await hashPassword(update.password);
        } catch (error: any) {
            return next(error);
        }
    }
    next();
});

export default userSchema;
