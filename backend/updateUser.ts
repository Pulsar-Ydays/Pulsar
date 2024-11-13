import User from './model/userModel'; // Assuming your model is still in JavaScript
import UpdateUserData from "./updateUserType";
import { ObjectId } from 'mongodb';

// Function to update user email based on username
export async function updateUser(id: string, updateData : UpdateUserData): Promise<any> {
    try {
        const query = { _id: new ObjectId(id) };
        // Update the user's email
        const updatedUser = await User.findOneAndUpdate(query, updateData, { new: true }).exec();

        if (updatedUser) {
            console.log("User updated successfully", updatedUser);
        } else {
            console.log("User not found");
        }
        return updatedUser;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}
