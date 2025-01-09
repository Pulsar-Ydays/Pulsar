import TransacData from "../../Type/transacType";
import Transac from "../../model/transacModel";
import {ObjectId} from "mongodb";

export async function deleteTransac(id: string): Promise<TransacData | null> {
    try {
        const query = { _id: new ObjectId(id) };

        const deletedTransac = await Transac.findByIdAndDelete(query).exec();


        console.log("Transaction deleted successfully", deletedTransac);
        return deletedTransac;

    } catch (error) {
        console.error("Error deleting transaction:", error);
        throw error; // Relance l'erreur pour la gérer en dehors
    }
}