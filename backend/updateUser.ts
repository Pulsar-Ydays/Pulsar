import mongoose from 'mongoose';
import User from './model/userModel'; // Assuming your model is still in JavaScript
import UpdateUserData from "./updateUserType.ts";

// Function to update user email based on username
export async function updateUser(username: string, updateData : UpdateUserData): Promise<void> {
    try {
        const query = { username: username };
        // Update the user's email
        const updatedUser = await User.findOneAndUpdate(query, updateData, { new: true }).exec();

        if (updatedUser) {
            console.log("User updated successfully", updatedUser);
        } else {
            console.log("User not found");
        }
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    } finally {
        // Optionally disconnect from mongoose if this is the last operation
        await mongoose.disconnect();
    }
}
