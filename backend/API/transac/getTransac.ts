import TransacData from "../../Type/transacType";
import Transac from "../../model/transacModel";
import {ObjectId} from "mongodb";

export async function getTransac(id: string): Promise<TransacData> {
    try {
        const query = { _id: new ObjectId(id) };
        const transac = await Transac.findById(query).exec(); // Attente de la promesse
        if (!transac) {
            throw new Error("transaction not found");
        } else {
            console.log(transac);
        }
        return transac;
    } catch (error) {
        console.error("Error fetching transaction:", error);
        throw error; // Relance l'erreur pour la gérer en dehors
    }
}