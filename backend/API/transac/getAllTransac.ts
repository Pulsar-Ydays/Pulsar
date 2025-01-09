import TransacData from "../../Type/transacType";
import Transac from "../../model/transacModel";

export async function getAllTransac(): Promise<TransacData[]> {
    try {
        const allTransac  = await Transac.find().exec(); // Attente de la promesse
        if (!allTransac || allTransac.length === 0) {
            throw new Error("No transaction found");
        } else {
            console.log(allTransac);
        }
        return allTransac
    } catch (error) {
        console.error("Error fetching transaction:", error);
        throw error; // Relance l'erreur pour la gérer en dehors
    }
}


