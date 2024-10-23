import mongoose from 'mongoose';
import User from './model/userModel'; // Assuming your model is still in JavaScript
import UserData from "./userType.ts";


export async function createUser(userData: UserData): Promise<any> {
    try {
        // Connect to the MongoDB database
        await mongoose.connect(process.env.MONGODB_URL!); // Use non-null assertion if you're sure it's defined

        // Create a new User instance
        const newUser = new User(userData);

        // Save the user to the database
        const savedUser = await newUser.save();
        console.log("User saved successfully:", savedUser);

        // Return the saved user object
        return savedUser;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;  // re-throw the error to handle it at a higher level if needed
    } finally {
        // Disconnect from the database after the operation is complete
        await mongoose.disconnect();
    }
}