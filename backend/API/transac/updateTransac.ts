import TransacData from "../../Type/transacType";
import Transac from "../../model/transacModel";
import {ObjectId} from "mongodb";

export async function updateTransac(id: string, updateData : TransacData): Promise<TransacData | null> {
    try {
        const query = {_id: new ObjectId(id)};
        const updatedTransac = Transac.findOneAndUpdate(query, updateData, {new: true}).exec();

        if (updatedTransac) {
            console.log("Transaction updated successfully", updatedTransac);
        } else {
            console.log("Transaction not found");
        }

        return updatedTransac;
    } catch (error) {
        console.error("Error updating transaction:", error);
        throw error;
    }
}