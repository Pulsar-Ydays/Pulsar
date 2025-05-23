import User from '../../model/userModel'; // Assuming your model is still in JavaScript
import UserData from "../../Type/userType";


export async function createUser(userData: UserData): Promise<UserData> {
    try {
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
    }
}