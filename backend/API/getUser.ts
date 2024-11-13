import UserData from "../userType";
import User from "../model/userModel";
import { ObjectId } from "mongodb";

export async function getUser(id: string): Promise<UserData> {
    try {
        const query = { _id: new ObjectId(id) };
        const user = await User.findById(query).exec(); // Attente de la promesse
        if (!user) {
            throw new Error("User not found");
        } else {
            console.log(user);
        }
        return user;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error; // Relance l'erreur pour la gérer en dehors
    }
}