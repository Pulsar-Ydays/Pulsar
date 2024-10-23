import mongoose from 'mongoose';

import User from './User';

export async function createUser(user) {
    try {
        await mongoose.connect(process.env.MONGODB_URL);

    }
    catch (error) {
        console.error("MongoDB connection error:", error);
    }


}