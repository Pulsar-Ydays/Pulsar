import mongoose from 'mongoose';
import User from '../model/userModel'; // Assuming your model is still in JavaScript
import UserData from "../userType";
import {ObjectId} from "mongodb";

export async function deleteUser(id : string): Promise<UserData | null> {
    try {
        const query = { _id: new ObjectId(id) };
        const deletedUser = await User.findByIdAndDelete(query).exec();

        console.log("User deleted successfully", deletedUser);
        return deletedUser;
    } catch(error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}