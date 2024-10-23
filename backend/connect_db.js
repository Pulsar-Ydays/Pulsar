import mongoose from 'mongoose';

export async function connectDB(connectionString) {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected successfully to MongoDB");
    } catch (e) {
        console.error("Connection error:", e);
    }
}

