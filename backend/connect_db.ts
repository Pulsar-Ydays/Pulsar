import mongoose from 'mongoose';

export async function connectDB(connectionString) {
    try {
        await mongoose.connect(connectionString);
        console.log("Connected successfully to MongoDB");
    } catch (e) {
        console.error("Connection error:", e);
    }
}

