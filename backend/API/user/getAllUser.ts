import UserData from "../../Type/userType";
import User from "../../model/userModel";

export async function getAllUsers(): Promise<UserData[]> {
    try {
        const allUser  = await User.find().exec(); // Attente de la promesse
        if (!allUser || allUser.length === 0) {
            throw new Error("No users found");
        } else {
            console.log(allUser);
        }
        return allUser
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // Relance l'erreur pour la gérer en dehors
    }
}
