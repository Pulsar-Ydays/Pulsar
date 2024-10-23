import mongoose from 'mongoose';
import User from './model/userModel'; // Assuming your model is still in JavaScript
import UserData from "./userType.ts";

export async function deleteUser(username: string): Promise<void> {
    try {
        const deletedUser = await User.deleteOne({username : username}).exec();

        console.log("User deleted successfully", deletedUser);
    } catch(error) {
        console.error("Error deleting user:", error);
        throw error;

    } finally {
        await mongoose.disconnect();
    }
}