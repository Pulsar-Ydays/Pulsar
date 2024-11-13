import User from './model/userModel'; // Assuming your model is still in JavaScript
import UserData from "./userType";
import { ObjectId } from 'mongodb';
import userSchema from "./schema/userSchema";

// Function to update user email based on username
export async function updateUser(id: string, updateData : UserData): Promise<any> {
    try {
        const query = { _id: new ObjectId(id) };
        // Update the user's email
        const updatedUser = User.findOneAndUpdate(query, updateData, { new: true }).exec() ;

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
