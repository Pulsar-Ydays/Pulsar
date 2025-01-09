import TransacData from "../../Type/transacType";
import Transac from "../../model/transacModel";

export async function createTransac(transacData: TransacData): Promise<TransacData> {
    try {
        const newTrans = new Transac(transacData);
        const savedTrans = await newTrans.save();

        console.log("Transaction saved successfully:", savedTrans);
        return savedTrans;
    } catch (error) {
        console.error("Error creating transaction:", error);
        throw error;
    }
}